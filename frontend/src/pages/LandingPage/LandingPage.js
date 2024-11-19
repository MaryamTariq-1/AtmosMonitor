// src/pages/LandingPage/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a href="#home" onClick={() => navigate('/')}>Home</a>
          <a href="#features" onClick={() => navigate('/features')}>Features</a>
          <a href="#services" onClick={() => navigate('/services')}>Services</a>
          <a href="#reports" onClick={() => navigate('/reports')}>Reports</a>
          <a href="#about" onClick={() => navigate('/about')}>About</a>
          <a href="#contact" onClick={() => navigate('/contact')}>Contact</a>
          <a href="#dashboard" onClick={() => navigate('/dashboard')}>Dashboard</a>
        </div>
        <div className="navbar-buttons">
          <button className="signin-btn" onClick={() => navigate('/signin')}>Sign In</button>
          <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to AtmosMonitor</h1>
          <p>Your Gateway to Real-Time Environmental Insights</p>
          <button onClick={() => navigate('/signup')} className="hero-button">Explore More</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Main Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-Time Monitoring</h3>
            <p>Stay updated with up-to-the-minute data on air quality and weather conditions.</p>
          </div>
          <div className="feature-card">
            <h3>Data Visualization</h3>
            <p>Interactive charts and graphs provide clear and concise views of your environment.</p>
          </div>
          <div className="feature-card">
            <h3>Health Impact Forecasting</h3>
            <p>Predict potential health risks based on environmental data trends.</p>
          </div>
          <div className="feature-card">
            <h3>Custom Alert System</h3>
            <p>Set and receive alerts for specific environmental thresholds.</p>
          </div>
          <div className="feature-card">
            <h3>Traffic & Pollution Prediction</h3>
            <p>Plan your commute with insights on traffic and air quality.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Home Integration</h3>
            <p>Optimize your home’s environment with seamless device connectivity.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Twitter">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
