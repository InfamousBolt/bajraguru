const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * POST /api/auth/login
 * Authenticate admin with password, return JWT.
 */
function login(req, res) {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    // Direct comparison (admin password is stored in env, not hashed)
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * GET /api/auth/verify
 * Check if the current token is valid.
 */
function verify(req, res) {
  // If we reach here, the auth middleware already validated the token
  return res.json({
    valid: true,
    user: req.user,
  });
}

module.exports = {
  login,
  verify,
};
