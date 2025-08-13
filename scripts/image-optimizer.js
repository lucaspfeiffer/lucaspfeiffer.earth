const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertToWebP(inputPath, outputPath, quality = 80) {
    try {
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);
        
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
        
        console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        console.log(`   Size: ${(inputSize/1024).toFixed(1)}KB → ${(outputSize/1024).toFixed(1)}KB (${savings}% smaller)`);
        
        // Remove original file
        fs.unlinkSync(inputPath);
        
        return outputPath;
    } catch (err) {
        console.error(`❌ Failed to convert ${inputPath}:`, err.message);
        return inputPath; // Return original path if conversion failed
    }
}

async function optimizeNewImages(imagesDir, processedPhotos) {
    console.log('\n🎨 Optimizing images to WebP...');
    
    const optimizedPhotos = [];
    
    for (const photo of processedPhotos) {
        const imagePath = path.join(__dirname, '..', photo.image);
        
        // Skip if image doesn't exist or is already WebP
        if (!fs.existsSync(imagePath) || imagePath.endsWith('.webp')) {
            optimizedPhotos.push(photo);
            continue;
        }
        
        // Convert to WebP
        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const convertedPath = await convertToWebP(imagePath, webpPath);
        
        // Update photo object with new path
        const updatedPhoto = {
            ...photo,
            image: path.relative(path.join(__dirname, '..'), convertedPath)
        };
        
        optimizedPhotos.push(updatedPhoto);
    }
    
    return optimizedPhotos;
}

module.exports = { convertToWebP, optimizeNewImages };