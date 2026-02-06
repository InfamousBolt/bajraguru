const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { authenticateToken } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

// Admin routes (require auth)
router.post('/', authenticateToken, productsController.create);
router.put('/:id', authenticateToken, productsController.update);
router.delete('/:id', authenticateToken, productsController.remove);

// Image routes (require auth)
router.post('/:id/images', authenticateToken, upload.array('images', 5), productsController.uploadImages);
router.delete('/:id/images/:imageId', authenticateToken, productsController.deleteImage);

module.exports = router;
