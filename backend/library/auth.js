const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { generateToken };
