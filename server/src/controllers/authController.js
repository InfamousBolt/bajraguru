const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'token';
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 24h

function tokenCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  };
}

/**
 * POST /api/auth/login
 * Authenticate admin with password, return JWT in httpOnly cookie.
 */
function login(req, res) {
  try {
    const { password } = req.body;

    console.log('[AUTH DEBUG] Login attempt received');
    console.log('[AUTH DEBUG] Password received:', password ? `"${password}" (length: ${password.length})` : 'EMPTY');

    if (!password) {
      console.log('[AUTH DEBUG] -> 400: No password provided');
      return res.status(400).json({ error: 'Password is required.' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('[AUTH DEBUG] ADMIN_PASSWORD env:', adminPassword ? `"${adminPassword}" (length: ${adminPassword.length})` : 'NOT SET');
    console.log('[AUTH DEBUG] Exact match:', password === adminPassword);

    if (!adminPassword) {
      console.log('[AUTH DEBUG] -> 500: ADMIN_PASSWORD env var is missing');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    if (password !== adminPassword) {
      console.log('[AUTH DEBUG] -> 401: Password mismatch');
      return res.status(401).json({ error: 'Invalid password.' });
    }

    console.log('[AUTH DEBUG] -> 200: Password matched, issuing JWT');

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie(COOKIE_NAME, token, tokenCookieOptions());

    return res.json({ message: 'Login successful.' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /api/auth/logout
 * Clear the auth cookie.
 */
function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  return res.json({ message: 'Logged out.' });
}

/**
 * GET /api/auth/verify
 * Check if the current token is valid.
 */
function verify(req, res) {
  return res.json({
    valid: true,
    user: req.user,
  });
}

module.exports = {
  login,
  logout,
  verify,
};
