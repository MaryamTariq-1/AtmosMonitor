const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// User Signup Route (POST): Registers a new user
router.post('/signup', signup);

// User Signin Route (POST): Authenticates user and returns JWT token
router.post('/signin', signin);

// Protected Dashboard Route (GET): Accessible only to authenticated users
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome to the dashboard, ${req.user.name || 'User'}!` });
});

module.exports = router;
