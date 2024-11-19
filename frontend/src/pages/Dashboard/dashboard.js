import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a onClick={() => navigate('/')}>Home</a>
          <a onClick={() => navigate('/features')}>Features</a>
          <a onClick={() => navigate('/services')}>Services</a>
          <a onClick={() => navigate('/reports')}>Reports</a>
          <a onClick={() => navigate('/about')}>About</a>
          <a onClick={() => navigate('/contact')}>Contact</a>
        </div>
        <div className="navbar-buttons">
          <button onClick={() => navigate('/signin')}>Sign In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-grid">
          {/* Real-Time Data Cards */}
          <div className="data-card">
            <h3>Air Quality Index (AQI)</h3>
            <p>Moderate (89)</p>
          </div>
          <div className="data-card">
            <h3>Temperature</h3>
            <p>22°C</p>
          </div>
          <div className="data-card">
            <h3>Humidity</h3>
            <p>65%</p>
          </div>
          <div className="data-card">
            <h3>Health Alert</h3>
            <p>Risk for asthma patients</p>
          </div>
        </div>

        {/* Graph/Map Section */}
        <div className="dashboard-visuals">
          <div className="chart">
            <h3>Historical AQI</h3>
            {/* Placeholder for Chart */}
            <div className="chart-placeholder">[Insert Chart Here]</div>
          </div>
          <div className="map">
            <h3>Air Quality Map</h3>
            {/* Placeholder for Map */}
            <div className="map-placeholder">[Insert Map Here]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
