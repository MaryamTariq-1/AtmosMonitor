const UserModel = require("../models/Users");
const { generateToken } = require("../library/auth");

// ✅ Signup Controller
exports.signup = async (req, res) => {
  console.log("📥 Incoming Request Body:", req.body); // Log request body for debugging

  try {
    const { name, email, password } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      console.log("❌ Validation Failed: Missing Fields");
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // ✅ Ensure email is lowercase
    const normalizedEmail = email.toLowerCase();

    // ✅ Check if user exists
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("⚠️ User Already Exists:", existingUser.email);
      return res.status(409).json({ error: "User already exists." });
    }

    // ✅ Create & Save User
    const newUser = new UserModel({ name, email: normalizedEmail, password });
    await newUser.save();
    console.log("✅ New User Created:", newUser);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};


// ✅ Signin Controller
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // ✅ Ensure email is case-insensitive
    const normalizedEmail = email.toLowerCase();

    // ✅ Find user in the database
    const user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // ✅ Verify password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ✅ Generate JWT Token
    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
