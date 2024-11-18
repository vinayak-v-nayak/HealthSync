const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'No token provided. Access denied.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key');
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticateUser };
