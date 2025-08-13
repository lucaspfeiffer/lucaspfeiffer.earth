const fs = require('fs');
const path = require('path');

function updateWebPPaths() {
    console.log('📝 Updating photo paths to WebP...');
    
    // Load processed photos
    const photosPath = path.join(__dirname, '../processed-photos.json');
    const processedPhotos = JSON.parse(fs.readFileSync(photosPath, 'utf8'));
    
    // Update paths from .jpg to .webp
    const updatedPhotos = processedPhotos.map(photo => ({
        ...photo,
        image: photo.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    }));
    
    // Save updated processed photos
    fs.writeFileSync(photosPath, JSON.stringify(updatedPhotos, null, 2));
    console.log(`Updated ${updatedPhotos.length} photo paths to WebP`);
    
    // Update photos.html
    const htmlPath = path.join(__dirname, '../photos.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Sort photos by date (newest first)
    const sortedPhotos = updatedPhotos
        .filter(p => p.image)
        .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            if (a.month !== b.month) return b.month - a.month;
            return b.created_at - a.created_at;
        });
    
    // Generate the photos array JavaScript
    const photosArray = sortedPhotos.map(photo => ({
        id: photo.id,
        year: photo.year,
        month: photo.month,
        image: photo.image,
        title: photo.title,
        description: photo.description
    }));
    
    const photosJs = JSON.stringify(photosArray, null, 12);
    const newPhotosDeclaration = `const photos = ${photosJs};`;
    
    // Replace the existing photos array
    const photosRegex = /const photos = \[[\s\S]*?\];/;
    html = html.replace(photosRegex, newPhotosDeclaration);
    
    fs.writeFileSync(htmlPath, html);
    console.log('Updated photos.html with WebP paths');
}

updateWebPPaths();