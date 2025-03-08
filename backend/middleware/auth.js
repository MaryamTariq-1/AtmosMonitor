const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT Authentication middleware for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
