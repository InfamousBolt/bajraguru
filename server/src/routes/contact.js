const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/auth');

// Public route - submit contact message
router.post('/', contactController.create);

// Admin route - list all messages
router.get('/', authenticateToken, contactController.getAll);

module.exports = router;
