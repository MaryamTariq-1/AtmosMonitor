const express = require('express');
const router = express.Router();
const UserModel = require("../models/Users"); // Ensure correct path
const { signup, signin, forgotPassword, verifyOtp } = require("../controllers/authController"); // Ensure correct import

// User Signup Route (POST)
router.post('/signup', signup);

// User Signin Route (POST)
router.post('/signin', signin);

// OTP Verification Route (POST)
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otpEntered } = req.body;

    if (!email || !otpEntered) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    // Centralized email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Normalize email before querying the database
    const normalizedEmail = email.toLowerCase();

    // Fetch user from DB
    const user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure verifyOtp is a function and use it properly
    if (typeof verifyOtp !== "function") {
      return res.status(500).json({ error: "Internal Server Error: OTP verification function not found." });
    }

    const isOtpValid = await verifyOtp(user, otpEntered); // Ensure proper usage
    if (!isOtpValid) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiryTime = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in /verify-otp route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
