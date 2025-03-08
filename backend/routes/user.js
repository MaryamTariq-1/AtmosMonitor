const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// User Signup Route (POST)
router.post('/signup', signup);

// User Signin Route (POST)
router.post('/signin', signin);

// Protected Dashboard Route (GET)
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome to the dashboard, User ID: ${req.user.userId}` });
});

module.exports = router;
