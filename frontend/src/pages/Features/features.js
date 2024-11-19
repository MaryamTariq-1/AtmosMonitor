import React from 'react';
import { useNavigate } from 'react-router-dom';
import './features.css';

// Import images
import aqmImage from './aqm.jfif';
import riskForecastImage from './RiskForecast.jfif';
import alertImage from './Alert.jfif';
import predictionImage from './predicton.jfif';
import smartwatchesImage from './smartwatches.jfif';
import dataVisualImage from './datavisual.jfif';

const FeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <div>
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

      <div className="features-page">
        <h1 className="features-title">Explore Use Cases</h1>
        <p className="features-subtitle">
          See what your business can do with AtmosMonitor on its side.
        </p>
        
        <div className="feature-cards">
          <div className="feature-card">
            <img src={aqmImage} alt="Find the best location" className="feature-image" />
            <h3>Real-time Air Quality Monitoring</h3>
            <p>Monitor air quality in real-time to stay updated on pollution levels in your area.</p>
          </div>

          <div className="feature-card">
            <img src={riskForecastImage} alt="Health Risk Forecasting" className="feature-image" />
            <h3>Health Risk Forecasting</h3>
            <p>Get predictions on potential health risks based on air quality levels.</p>
          </div>

          <div className="feature-card">
            <img src={alertImage} alt="Custom Alerts" className="feature-image" />
            <h3>Custom Alerts</h3>
            <p>Set up personalized alerts for air quality thresholds to keep yourself informed.</p>
          </div>

          <div className="feature-card">
            <img src={predictionImage} alt="Traffic and pollution prediction" className="feature-image" />
            <h3>Traffic and Pollution Prediction</h3>
            <p>Predict how traffic will affect air quality in your area and plan accordingly.</p>
          </div>

          <div className="feature-card">
            <img src={smartwatchesImage} alt="Smart Device Integration" className="feature-image" />
            <h3>Smart Device Integration</h3>
            <p>Integrate with smartwatches and smart home devices to monitor air quality and receive notifications.</p>
          </div>

          <div className="feature-card">
            <img src={dataVisualImage} alt="Data Visualization" className="feature-image" />
            <h3>Data Visualization</h3>
            <p>Visualize air quality data through interactive charts and maps for better decision-making.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
