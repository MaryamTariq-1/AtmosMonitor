import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpForPasswordReset, verifyOtpAndResetPassword } from "../../api";
import "./forgetpass.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await sendOtpForPasswordReset(email);
      setMessage(data.message);
      setOtpSent(true);
      setError("");
    } catch (error) {
      setError(error.response ? error.response.data.error : "Failed to send OTP. Please try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await verifyOtpAndResetPassword(email, otp, newPassword);
      setMessage(data.message);
      setError("");
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // Redirect to Sign-In page after successful reset
    } catch (error) {
      setError(error.response ? error.response.data.error : "Failed to reset password. Try again.");
      setMessage("");
    } finally {
      setLoading(false);
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

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Remembered your password?{" "}
          <a href="/signin" className="signin-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
