#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { NostrClient } = require('./nostr-websocket');
const { npubToHex } = require('./npub-decoder');
const { optimizeNewImages } = require('./image-optimizer');

// Extract image URLs from event content and tags
function extractImages(event) {
    const images = [];
    
    // Check for imeta tags (NIP-92 - Media Attachments)
    if (event.tags) {
        event.tags.forEach(tag => {
            if (tag[0] === 'imeta') {
                const url = tag.find(item => item.startsWith('url '))?.substring(4);
                const mimeType = tag.find(item => item.startsWith('m '))?.substring(2);
                const alt = tag.find(item => item.startsWith('alt '))?.substring(4);
                
                if (url && mimeType && mimeType.startsWith('image/')) {
                    images.push({
                        url,
                        mimeType,
                        alt: alt || ''
                    });
                }
            }
        });
    }
    
    // Check content for image URLs - nostr.build and other common hosts
    const imageUrlRegex = /https?:\/\/[^\s]*(?:image\.nostr\.build|nostr\.build|cdn\.satellite\.earth|void\.cat|i\.imgur\.com|primal\.net\/api\/media)[^\s]*\.?(?:jpg|jpeg|png|gif|webp|bmp)/gi;
    const contentUrls = event.content.match(imageUrlRegex) || [];
    
    // Also check for direct image links
    const directImageRegex = /https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|bmp)/gi;
    const directUrls = event.content.match(directImageRegex) || [];
    
    [...contentUrls, ...directUrls].forEach(url => {
        if (!images.find(img => img.url === url)) {
            const extension = url.split('.').pop().toLowerCase();
            images.push({
                url: url.trim(),
                mimeType: `image/${extension}`,
                alt: ''
            });
        }
    });
    
    return images;
}

// Download image and save locally
async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading: ${url}`);
        
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                // Follow redirect
                return downloadImage(res.headers.location, filename)
                    .then(resolve)
                    .catch(reject);
            }
            
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download image: ${res.statusCode}`));
                return;
            }
            
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                
                // Ensure images directory exists
                const imagesDir = path.dirname(filename);
                if (!fs.existsSync(imagesDir)) {
                    fs.mkdirSync(imagesDir, { recursive: true });
                }
                
                fs.writeFileSync(filename, buffer);
                console.log(`Saved: ${filename} (${buffer.length} bytes)`);
                resolve(filename);
            });
        }).on('error', reject);
    });
}

// Load existing photos to avoid duplicates
function loadExistingPhotos() {
    try {
        const photosPath = path.join(__dirname, '../processed-photos.json');
        if (fs.existsSync(photosPath)) {
            return JSON.parse(fs.readFileSync(photosPath, 'utf8'));
        }
    } catch (err) {
        console.log('No existing photos file found, starting fresh');
    }
    return [];
}

// Save processed photos list
function saveProcessedPhotos(photos) {
    const photosPath = path.join(__dirname, '../processed-photos.json');
    fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2));
    console.log(`Saved ${photos.length} processed photos to ${photosPath}`);
}

// Clean text content by removing URLs and extra whitespace
function cleanContent(content) {
    return content
        .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}

// Update the photos array in photos.html
function updatePhotosHtml(allPhotos) {
    const photosPath = path.join(__dirname, '../photos.html');
    let html = fs.readFileSync(photosPath, 'utf8');
    
    // Sort photos by date (newest first)
    const sortedPhotos = allPhotos
        .filter(p => p.image) // Only include photos with valid images
        .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            if (a.month !== b.month) return b.month - a.month;
            return b.created_at - a.created_at;
        });
    
    // Generate the photos array JavaScript with proper formatting
    const photosArray = sortedPhotos.map(photo => ({
        id: photo.id,
        year: photo.year,
        month: photo.month,
        image: photo.image,
        title: photo.title,
        description: photo.description
    }));
    
    const photosJs = JSON.stringify(photosArray, null, 12);
    
    // Replace the existing photos array
    const photosRegex = /const photos = \[[\s\S]*?\];/;
    const newPhotosDeclaration = `const photos = ${photosJs};`;
    
    if (photosRegex.test(html)) {
        html = html.replace(photosRegex, newPhotosDeclaration);
    } else {
        console.error('Could not find photos array in photos.html');
        return;
    }
    
    fs.writeFileSync(photosPath, html);
    console.log(`Updated photos.html with ${sortedPhotos.length} photos`);
}

// Main function
async function main() {
    console.log('🚀 Starting Nostr photo fetcher...\n');
    
    try {
        const npub = 'npub1sunw47xw6e9pyhjv2fvtphfy6z734ck4ne844q9yl6f8cyhqczrqz3fjdk';
        const pubkey = npubToHex(npub);
        
        console.log('📡 Connecting to Nostr relay...');
        const client = new NostrClient('wss://relay.damus.io');
        await client.connect();
        
        // Request recent events with photos
        const filter = {
            authors: [pubkey],
            kinds: [1, 20], // Text notes and picture-first events
            limit: 200
        };
        
        console.log('📥 Fetching recent posts...');
        const events = await client.subscribe(filter);
        client.close();
        
        console.log(`Found ${events.length} posts\n`);
        
        const existingPhotos = loadExistingPhotos();
        const newPhotos = [];
        let downloadCount = 0;
        
        for (const event of events) {
            // Skip if we've already processed this event
            if (existingPhotos.find(p => p.eventId === event.id)) {
                continue;
            }
            
            const images = extractImages(event);
            if (images.length === 0) continue;
            
            const eventDate = new Date(event.created_at * 1000);
            const year = eventDate.getFullYear();
            const month = eventDate.getMonth() + 1;
            
            console.log(`📷 Processing event ${event.id.substring(0, 8)} (${images.length} images)`);
            console.log(`   Date: ${eventDate.toISOString().split('T')[0]}`);
            console.log(`   Content: "${cleanContent(event.content).substring(0, 80)}..."`);
            
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const extension = image.mimeType.split('/')[1] || 'jpg';
                const filename = `nostr-${event.id.substring(0, 8)}-${i}.${extension}`;
                const imagePath = path.join(__dirname, '../images', filename);
                
                try {
                    await downloadImage(image.url, imagePath);
                    downloadCount++;
                    
                    const cleanText = cleanContent(event.content);
                    
                    const photo = {
                        id: `nostr-${event.id.substring(0, 8)}-${i}`,
                        eventId: event.id,
                        year,
                        month,
                        image: `images/${filename}`,
                        title: cleanText.substring(0, 50) || `Photo from ${eventDate.toISOString().split('T')[0]}`,
                        description: cleanText || image.alt || `Posted on ${eventDate.toLocaleDateString()}`,
                        created_at: event.created_at,
                        originalUrl: image.url
                    };
                    
                    newPhotos.push(photo);
                    console.log(`   ✅ Added: ${photo.title.substring(0, 30)}...`);
                    
                } catch (err) {
                    console.error(`   ❌ Failed to download ${image.url}: ${err.message}`);
                }
            }
            console.log('');
        }
        
        if (newPhotos.length > 0) {
            // Optimize images to WebP
            const optimizedPhotos = await optimizeNewImages(path.join(__dirname, '../images'), [...existingPhotos, ...newPhotos]);
            
            // Save all photos (existing + new, optimized)  
            saveProcessedPhotos(optimizedPhotos);
            
            // Update photos.html
            updatePhotosHtml(optimizedPhotos);
            
            console.log(`\n🎉 Successfully processed ${newPhotos.length} new photos (${downloadCount} downloads)`);
            console.log(`📊 Total photos: ${optimizedPhotos.length}`);
        } else {
            console.log('ℹ️ No new photos found');
        }
        
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main, extractImages, downloadImage };