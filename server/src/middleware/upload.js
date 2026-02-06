const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// Use memory storage so we can process with Sharp before saving
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
});

/**
 * Ensure the upload directory for a specific product exists.
 */
function ensureProductUploadDir(productId) {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
  const productDir = path.join(uploadDir, 'products', productId);

  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  return productDir;
}

module.exports = {
  upload,
  ensureProductUploadDir,
};
