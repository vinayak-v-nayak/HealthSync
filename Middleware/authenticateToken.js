const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' }); // No token, unauthorized
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key', (err, user) => {
        if (err) {
            // Log the error for debugging
            console.error('Token verification error:', err);

            // Handle different token errors
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' }); // Token expired
            }

            // If the error is anything else (invalid token, etc.)
            return res.status(403).json({ message: 'Invalid token. Access denied.' });
        }

        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = { authenticateToken }; // Export the middleware
