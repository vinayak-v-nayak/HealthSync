const jwt = require('jsonwebtoken');

function authenticatedToken(req, res, next) {
  // Extract token from the 'Authorization' header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // Verify the token and decode user information (e.g., userId)
  jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key', (err, decoded) => {
    if (err) {
      let message = 'Invalid token.';
      // Customize the error message based on the error type
      if (err.name === 'TokenExpiredError') {
        message = 'Token expired. Please log in again.';
      }
      return res.status(403).json({ message }); // Return error message based on token validity
    }

    // Attach user info (e.g., userId) to the request object
    req.user = decoded; // decoded contains the decoded payload from the JWT
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = { authenticatedToken }; // Export the middleware
