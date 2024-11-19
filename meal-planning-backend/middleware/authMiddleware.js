// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from the header
  
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const verified = jwt.verify(token, 'your_jwt_secret_key');
    req.user = verified;  // Attach the user data to the request
    next();  // Pass control to the next handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;