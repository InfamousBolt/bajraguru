const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || './uploads');

/**
 * Process an uploaded image: resize, create thumbnail, convert to WebP.
 *
 * @param {Buffer} buffer - The raw file buffer from multer memory storage.
 * @param {string} productId - The product this image belongs to.
 * @returns {Promise<{ id: string, original: string, thumbnail: string }>}
 */
async function processImage(buffer, productId) {
  const imageId = uuidv4();
  const productDir = path.join(UPLOAD_DIR, 'products', productId);

  // Ensure directories exist
  const thumbDir = path.join(productDir, 'thumbnails');
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  const originalFilename = `${imageId}.webp`;
  const thumbnailFilename = `${imageId}_thumb.webp`;

  const originalPath = path.join(productDir, originalFilename);
  const thumbnailPath = path.join(thumbDir, thumbnailFilename);

  // Resize to max 1200px width, convert to WebP
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(originalPath);

  // Create 300px thumbnail
  await sharp(buffer)
    .resize({ width: 300, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbnailPath);

  // Return URL paths relative to the static /uploads mount
  const originalUrl = `/uploads/products/${productId}/${originalFilename}`;
  const thumbnailUrl = `/uploads/products/${productId}/thumbnails/${thumbnailFilename}`;

  return {
    id: imageId,
    original: originalUrl,
    thumbnail: thumbnailUrl,
  };
}

/**
 * Delete an image and its thumbnail from the filesystem.
 *
 * @param {string} imageUrl - The URL path of the original image (e.g. /uploads/products/xxx/yyy.webp).
 */
function deleteImageFiles(imageUrl) {
  try {
    // Resolve the original file path
    const relativePath = imageUrl.replace(/^\/uploads\//, '');
    const absolutePath = path.join(UPLOAD_DIR, relativePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    // Try to delete the corresponding thumbnail
    const dir = path.dirname(absolutePath);
    const ext = path.extname(absolutePath);
    const baseName = path.basename(absolutePath, ext);
    const thumbPath = path.join(dir, 'thumbnails', `${baseName}_thumb${ext}`);

    if (fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
    }
  } catch (err) {
    console.error('Error deleting image files:', err.message);
  }
}

/**
 * Delete all images for a product from the filesystem.
 *
 * @param {string} productId - The product ID whose images should be deleted.
 */
function deleteProductImageDir(productId) {
  try {
    const productDir = path.join(UPLOAD_DIR, 'products', productId);
    if (fs.existsSync(productDir)) {
      fs.rmSync(productDir, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('Error deleting product image directory:', err.message);
  }
}

module.exports = {
  processImage,
  deleteImageFiles,
  deleteProductImageDir,
};
