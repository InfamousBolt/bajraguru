const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public route - login
router.post('/login', authController.login);

// Protected route - verify token
router.get('/verify', authenticateToken, authController.verify);

module.exports = router;
