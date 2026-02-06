const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Public routes
router.get('/', feedbackController.getAll);
router.post('/', feedbackController.create);

module.exports = router;
