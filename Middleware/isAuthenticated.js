// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Bearer
  
    if (token) {
      // Verify token logic (e.g., using jsonwebtoken)
      jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = { id: decoded.id }; // Assuming your JWT has the user's ID
        next();
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

module.exports = { isAuthenticated }; 