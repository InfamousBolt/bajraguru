const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/auth');

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.get('/', feedbackController.getAll);
router.post('/', submitLimiter, feedbackController.create);

// Admin routes (require auth)
router.delete('/:id', authenticateToken, feedbackController.remove);

module.exports = router;
