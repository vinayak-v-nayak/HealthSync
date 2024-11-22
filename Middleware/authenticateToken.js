const jwt = require('jsonwebtoken');

// Middleware to authenticate and validate JWT token
const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing. Please log in.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key', (err, user) => {
        if (err) {
            // Log the error for debugging purposes
            console.error('Token verification error:', err);

            // Handle different types of token errors
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            } 

            // Handle any other token-related errors (invalid token, etc.)
            return res.status(403).json({ message: 'Invalid token. Access denied.' });
        }

        // Attach the decoded user data to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticateToken }; // Export the middleware
