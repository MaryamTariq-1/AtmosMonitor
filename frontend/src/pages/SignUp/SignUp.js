import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signup } from '../../api';  // Import signup function from api.js
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(name, email, password);
      alert(data.message); // Show success message from backend
      navigate("/signin");  // Redirect to SignIn page after successful signup
    } catch (error) {
      setError(error); // Display error if sign-up fails
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
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}  {/* Show error message if any */}
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
