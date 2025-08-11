const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTOS_SOURCE_DIR = '/Users/david/Documents/Dynatec/Dynatec/bodas/photos';
const PUBLIC_PHOTOS_DIR = path.join(__dirname, '..', 'public', 'photos');
const MANIFEST_PATH = path.join(__dirname, '..', 'public', 'photos.manifest.json');

async function getImageMetadata(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const metadata = await sharp(filePath).metadata();
    
    return {
      filename: path.basename(filePath),
      width: metadata.width,
      height: metadata.height,
      orientation: metadata.width > metadata.height ? 'horizontal' : 'vertical',
      format: metadata.format,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

async function processPhotos() {
  console.log('🚀 Starting photo processing...');
  
  // Create public/photos directory if it doesn't exist
  if (!fs.existsSync(PUBLIC_PHOTOS_DIR)) {
    fs.mkdirSync(PUBLIC_PHOTOS_DIR, { recursive: true });
  }
  
  // Read all JPEG files from source directory
  const files = fs.readdirSync(PHOTOS_SOURCE_DIR)
    .filter(file => file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg'))
    .sort();
  
  console.log(`📸 Found ${files.length} photos to process`);
  
  const manifest = [];
  
  for (const file of files) {
    const sourcePath = path.join(PHOTOS_SOURCE_DIR, file);
    const targetPath = path.join(PUBLIC_PHOTOS_DIR, file);
    
    // Copy original file to public directory
    fs.copyFileSync(sourcePath, targetPath);
    
    // Get metadata
    const metadata = await getImageMetadata(sourcePath);
    if (metadata) {
      manifest.push(metadata);
      console.log(`✅ Processed: ${file} (${metadata.width}x${metadata.height})`);
    }
  }
  
  // Sort by creation date (newest first)
  manifest.sort((a, b) => new Date(b.created) - new Date(a.created));
  
  // Write manifest file
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  
  console.log(`🎉 Successfully processed ${manifest.length} photos`);
  console.log(`📄 Manifest written to: ${MANIFEST_PATH}`);
}

// Run the script
processPhotos().catch(console.error);