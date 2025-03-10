import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signup, verifyOtp } from "../../api"; // Import API functions
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [otpSent, setOtpSent] = useState(false); // OTP Sent Status
  const [error, setError] = useState(""); // Error Handling
  const [otpError, setOtpError] = useState(""); // OTP Error Handling
  const [loading, setLoading] = useState(false); // Loading State

  // Handle user sign-up and send OTP
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signup(name, email, password);
      setOtpSent(true);
      setError("");
      alert(data.message); // Show success message
    } catch (error) {
      setError(error.response ? error.response.data.error : "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpError("");

    try {
      const data = await verifyOtp(email, otp);
      alert(data.message); // Show success message
      navigate("/signin"); // Redirect to Sign-In
    } catch (error) {
      setOtpError(error.response ? error.response.data.error : "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <nav className="navbar">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            AtmosMonitor
          </div>
          <div className="navbar-links">
            <button className="nav-link" onClick={() => navigate("/")}>
              Explore More Before SignUp
            </button>
          </div>
          <div className="navbar-buttons">
            <button className="signin-btn" onClick={() => navigate("/signin")}>
              Sign In
            </button>
          </div>
        </nav>
      </header>

      <div className="signup-container">
        <h2>Create Your Account</h2>
        {!otpSent ? (
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {otpError && <p style={{ color: "red" }}>{otpError}</p>}

        <p>
          Already have an account?{" "}
          <a href="/signin" className="signin-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
