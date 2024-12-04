// SignUp.js
import { useNavigate } from 'react-router-dom';
import React from 'react';


import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();  
  return (
    <div className="signup-page">
      <header className="signup-header">
        <nav className="navbar">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            AtmosMonitor
          </div>
          <div className="navbar-links">
            <button className="nav-link" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="nav-link" onClick={() => navigate("/about")}>
              About
            </button>
          </div>
          <div className="navbar-buttons">
            <button className="signin-btn" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <div className="signup-container">
        <h2>WELCOME BACK !</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
