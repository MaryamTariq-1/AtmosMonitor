import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '../../api';  // Import login function from api.js
import './SignIn.css';
//
const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      alert(data.message); // Show success message from backend
      localStorage.setItem("token", data.token); // Save JWT token in localStorage
      navigate("/");  // Redirect to the homepage or dashboard
    } catch (error) {
      setError(error); // Display error if login fails
    }
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
        <h2>WELCOME BACK!</h2>
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
          <button type="submit">Log In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}  {/* Show error message if any */}
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
