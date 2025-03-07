// backend/controllers/authController.js

const UserModel = require('../models/Users');
const { generateToken } = require('../library/auth');

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// Signin controller
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!password || !password.trim() || !email) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    if (!password || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};