const express = require('express');
const authenticateToken = require('../middleware/auth');
const Router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.name}!` });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const authenticateToken = require('../middleware/auth');

// ----- Registration Endpoint -----
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance (password will be hashed via pre-save middleware)
    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// ----- Login Endpoint -----
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Include extra info (like name) in the payload if needed
    const payload = { userId: user._id, name: user.name };
    
    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// ----- Protected Route Example -----
// GET /api/auth/dashboard
router.get('/dashboard', authenticateToken, (req, res) => {
  // Now req.user contains { userId, name } if login payload was set that way.
  res.json({ message: `Welcome to the dashboard, ${req.user.name}!` });
});

module.exports = router;
