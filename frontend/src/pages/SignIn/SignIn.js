// frontend/src/pages/SignIn/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { login } from "../../api"; // Import signin function from api.js
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password); // Call the API to log in
      alert(data.message); // Show success message
      navigate("/dashboard"); // Redirect to Dashboard after successful login
    } catch (error) {
      setError(error); // Display error if sign-in fails
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to forgot-password page
  };

  return (
    <div className="signin-page">
      <header className="signin-header">
        <nav className="navbar">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            AtmosMonitor
          </div>
          <div className="navbar-links">
            <button className="nav-link" onClick={() => navigate("/")}>
              Explore More Before SignIn
            </button>
          </div>
          <div className="navbar-buttons">
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <div className="signin-container">
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if any */}
        
        {/* Forgot Password link */}
        <div className="forgot-password">
          <button className="forgot-password-link" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
