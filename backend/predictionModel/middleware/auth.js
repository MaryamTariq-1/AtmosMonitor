const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']; // Token sent in headers

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.user = verified; // Add the user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
