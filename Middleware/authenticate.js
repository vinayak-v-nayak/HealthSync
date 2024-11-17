const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'My-secret-key');
    req.userId = decoded.userId; // Attach `userId` to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed. Invalid token." });
  }
};

module.exports = {authenticate};
