const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate JWT Token (Reusable function)
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // short-lived token
  });
};

// Verify JWT Token (for middleware usage)
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
