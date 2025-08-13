const fs = require('fs');
const path = require('path');
const { convertToWebP } = require('./image-optimizer');

async function convertExistingImages() {
    const imagesDir = path.join(__dirname, '../images');
    const files = fs.readdirSync(imagesDir);
    
    console.log('🎨 Converting existing images to WebP...\n');
    
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i) && file.startsWith('nostr-')) {
            const inputPath = path.join(imagesDir, file);
            const outputPath = path.join(imagesDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
            
            await convertToWebP(inputPath, outputPath, 80);
        }
    }
    
    console.log('\n✅ Conversion complete!');
}

convertExistingImages().catch(console.error);