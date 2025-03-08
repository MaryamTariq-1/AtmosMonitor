// frontend/src/pages/SignIn/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api';  // Import the reset password API function
import './forgetpass.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await resetPassword(email); // Call the API to reset password
      setMessage(data.message); // Show success message
      setError("");  // Clear previous error messages
    } catch (error) {
      setError(error.message); // Show error if failed
      setMessage("");  // Clear success message
    }
  };

  return (
    <div className="forgot-password-page">
      <header className="forgot-password-header">
        <nav className="navbar">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            AtmosMonitor
          </div>
        </nav>
      </header>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}  {/* Success message */}
        {error && <p style={{ color: "red" }}>{error}</p>}  {/* Error message */}
        <p>
          Remembered your password?{" "}
          <a href="/signin" className="signin-link">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
