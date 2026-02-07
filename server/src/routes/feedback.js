const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', feedbackController.getAll);
router.post('/', feedbackController.create);

// Admin routes (require auth)
router.delete('/:id', authenticateToken, feedbackController.remove);

module.exports = router;
