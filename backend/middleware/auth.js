const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT Authentication middleware for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Header format check: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded token (userId) into request for further use
    req.user = { userId: decoded.userId };

    // Continue to next middleware/controller
    next();
  } catch (error) {
    // Clear handling of invalid or expired token
    res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
