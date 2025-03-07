const UserModel = require("../models/Users");
const { generateToken } = require("../library/auth");

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Create new user
    const user = new UserModel({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signin controller
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Password verification using reusable method (defined in Users.js model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT Token (using reusable function)
    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
