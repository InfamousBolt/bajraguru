const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  console.log('[AUTH MW DEBUG] Verifying token for:', req.method, req.originalUrl);

  // Read from httpOnly cookie first, fall back to Authorization header
  const token = req.cookies?.token
    || (req.headers['authorization']?.startsWith('Bearer ')
      ? req.headers['authorization'].slice(7)
      : null);

  if (!token) {
    console.log('[AUTH MW DEBUG] -> 401: No token found (cookie:', !!req.cookies?.token, ', auth header:', !!req.headers['authorization'], ')');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH MW DEBUG] -> Token valid, role:', decoded.role);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('[AUTH MW DEBUG] -> 401: Token verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = { authenticateToken };
