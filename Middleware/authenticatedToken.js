const jwt = require('jsonwebtoken');

const authenticatedToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key');
    req.userId = decoded.userId; // Attach decoded user info to the request
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = {authenticatedToken};
