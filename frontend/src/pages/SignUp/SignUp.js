// SignUp.js for signup
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'
import './SignUp.css';




const SignUp = () => {
    const navigate = useNavigate();  
    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/user', { name, email, Password })
            .then(result => console.log(result))
        .catch(err => console.log(err))
    }

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
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
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
