const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// Magic byte signatures for allowed image formats
const MAGIC_BYTES = [
  { type: 'image/jpeg', bytes: [0xFF, 0xD8, 0xFF] },
  { type: 'image/png',  bytes: [0x89, 0x50, 0x4E, 0x47] },
  { type: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF header
];

// Use memory storage so we can process with Sharp before saving
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WebP are allowed.'), false);
  }
};

/**
 * Validate file buffer against known image magic bytes.
 * Call this after multer parses the upload (in the route handler).
 */
function validateMagicBytes(buffer) {
  return MAGIC_BYTES.some(({ bytes }) =>
    bytes.every((b, i) => buffer[i] === b)
  );
}

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
  validateMagicBytes,
};
