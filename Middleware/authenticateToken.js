const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token

    console.log('Incoming Token:', token); // Log the token

    if (!token) {
        return res.sendStatus(401); // No token, unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key', (err, user) => {
        if (err) {
            console.error('Token verification error:', err); // Log error
            return res.sendStatus(403); // Invalid token
        }
        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = { authenticateToken }; // Export the middleware if in a separate file
