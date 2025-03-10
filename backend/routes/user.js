const express = require('express');
const router = express.Router();
const { signup, signin, forgotPassword, verifyOtp } = require('../controllers/authController'); // Ensure verifyOtp is imported

// User Signup Route (POST)
router.post('/signup', signup);

// User Signin Route (POST)
router.post('/signin', signin);

// OTP Verification Route (POST) for Signup, Signin, and Forgot Password
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otpEntered } = req.body;

    // Ensure both email and OTP are provided
    if (!email || !otpEntered) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    // Validate email format before querying the database
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Verify OTP using the controller function
    const isOtpValid = await verifyOtp(normalizedEmail, otpEntered);
    if (!isOtpValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    next(error); // Use centralized error handling middleware
  }
});

module.exports = router;
