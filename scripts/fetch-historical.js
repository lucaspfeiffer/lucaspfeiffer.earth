#!/usr/bin/env node

// Specialized script for fetching older historical photos
const fs = require('fs');
const path = require('path');
const { NostrClient } = require('./nostr-websocket');
const { npubToHex } = require('./npub-decoder');
// Import utility functions
const https = require('https');

async function fetchHistoricalPhotos() {
    console.log('🕒 Fetching historical Nostr photos (older than 1 year)...\n');
    
    try {
        const npub = 'npub1sunw47xw6e9pyhjv2fvtphfy6z734ck4ne844q9yl6f8cyhqczrqz3fjdk';
        const pubkey = npubToHex(npub);
        
        // Focus on relays that showed more historical data
        const historicalRelays = [
            'wss://nos.lol',
            'wss://nostr.wine',
            'wss://relay.nostr.band'
        ];
        
        const allEvents = new Map();
        const oneYearAgo = Math.floor(Date.now() / 1000) - (365 * 24 * 60 * 60);
        const fiveYearsAgo = Math.floor(Date.now() / 1000) - (5 * 365 * 24 * 60 * 60);
        
        for (const relayUrl of historicalRelays) {
            try {
                console.log(`📡 Connecting to ${relayUrl}...`);
                const client = new NostrClient(relayUrl);
                await client.connect();
                
                // Request older events (older than 1 year)
                const filter = {
                    authors: [pubkey],
                    kinds: [1, 20],
                    limit: 1000,
                    until: oneYearAgo, // Only get events older than 1 year
                    since: fiveYearsAgo // But not older than 5 years
                };
                
                console.log('📥 Fetching historical posts...');
                console.log(`   Looking for posts between ${new Date(fiveYearsAgo * 1000).getFullYear()} and ${new Date(oneYearAgo * 1000).getFullYear()}`);
                
                const events = await client.subscribe(filter);
                client.close();
                
                events.forEach(event => allEvents.set(event.id, event));
                console.log(`   ✅ Got ${events.length} posts (${allEvents.size} unique total)\n`);
                
            } catch (err) {
                console.error(`   ❌ Failed to connect to ${relayUrl}: ${err.message}\n`);
                continue;
            }
        }
        
        const events = Array.from(allEvents.values());
        console.log(`📊 Total historical events: ${events.length}\n`);
        
        if (events.length === 0) {
            console.log('ℹ️ No historical photos found');
            return;
        }
        
        const existingPhotos = loadExistingPhotos();
        const newPhotos = [];
        let downloadCount = 0;
        
        // Sort events by date (oldest first for historical context)
        const sortedEvents = events.sort((a, b) => a.created_at - b.created_at);
        
        for (const event of sortedEvents) {
            // Skip if already processed
            if (existingPhotos.find(p => p.eventId === event.id)) {
                continue;
            }
            
            const images = extractImages(event);
            if (images.length === 0) continue;
            
            const eventDate = new Date(event.created_at * 1000);
            const year = eventDate.getFullYear();
            const month = eventDate.getMonth() + 1;
            
            console.log(`📷 Processing historical event ${event.id.substring(0, 8)} (${images.length} images)`);
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
                        title: cleanText.substring(0, 50) || `Historical photo from ${eventDate.toISOString().split('T')[0]}`,
                        description: cleanText || image.alt || `Posted on ${eventDate.toLocaleDateString()}`,
                        created_at: event.created_at,
                        originalUrl: image.url
                    };
                    
                    newPhotos.push(photo);
                    console.log(`   ✅ Added: ${photo.title.substring(0, 30)}...`);
                    
                    // Process in batches of 10 to avoid memory issues
                    if (newPhotos.length % 10 === 0) {
                        console.log(`   📊 Processed ${newPhotos.length} historical photos so far...`);
                    }
                    
                } catch (err) {
                    console.error(`   ❌ Failed to download ${image.url}: ${err.message}`);
                }
            }
            console.log('');
        }
        
        if (newPhotos.length > 0) {
            // Save historical photos (without optimization for now - can be done separately)
            const allPhotos = [...existingPhotos, ...newPhotos];
            saveProcessedPhotos(allPhotos);
            
            console.log(`\n🎉 Successfully processed ${newPhotos.length} historical photos (${downloadCount} downloads)`);
            console.log(`📊 Total photos: ${allPhotos.length}`);
            console.log(`📅 Date range: ${new Date(Math.min(...newPhotos.map(p => p.created_at)) * 1000).getFullYear()} - ${new Date(Math.max(...allPhotos.map(p => p.created_at)) * 1000).getFullYear()}`);
            
            console.log('\n💡 Run `node image-optimizer.js` to convert historical photos to WebP');
            console.log('💡 Run `node update-webp-paths.js` to update photos.html');
        } else {
            console.log('ℹ️ No new historical photos found');
        }
        
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

// Utility functions (copied from main script)
function cleanContent(content) {
    return content
        .replace(/https?:\/\/[^\s]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

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

function saveProcessedPhotos(photos) {
    const photosPath = path.join(__dirname, '../processed-photos.json');
    fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2));
    console.log(`Saved ${photos.length} processed photos to ${photosPath}`);
}

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading: ${url}`);
        
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
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

// Extract image URLs from event content and tags
function extractImages(event) {
    const images = [];
    
    // Check for imeta tags (NIP-92)
    if (event.tags) {
        event.tags.forEach(tag => {
            if (tag[0] === 'imeta') {
                const url = tag.find(item => item.startsWith('url '))?.substring(4);
                const mimeType = tag.find(item => item.startsWith('m '))?.substring(2);
                const alt = tag.find(item => item.startsWith('alt '))?.substring(4);
                
                if (url && mimeType && mimeType.startsWith('image/')) {
                    images.push({ url, mimeType, alt: alt || '' });
                }
            }
        });
    }
    
    // Check content for image URLs
    const imageUrlRegex = /https?:\/\/[^\s]*(?:image\.nostr\.build|nostr\.build|cdn\.satellite\.earth|void\.cat|i\.imgur\.com|primal\.net\/api\/media|m\.primal\.net)[^\s]*\.?(?:jpg|jpeg|png|gif|webp|bmp)/gi;
    const contentUrls = event.content.match(imageUrlRegex) || [];
    
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

// Run if called directly
if (require.main === module) {
    fetchHistoricalPhotos();
}