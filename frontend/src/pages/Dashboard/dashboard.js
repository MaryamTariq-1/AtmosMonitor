import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo"> Dashboard</div>
        <ul className="sidebar-links">
          <li>
            <a href="#home" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </a>
          </li>
          <li>
            <a href="#stats">
              <FontAwesomeIcon icon={faDesktop} /> Monitoring Environment
            </a>
          </li>


          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faMap} /> Map
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> Visual Data
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> Alerts
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> Alerts
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> Alerts
            </a>
          </li>
          <li>
            <a href="#health-impact">
              <FontAwesomeIcon icon={faHeartPulse} /> Health Impact
            </a>
          </li>
          <li>
            <a href="#health-impact"></a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="stats" id="stats">
          <h2>Monitoring Environment</h2>
          <div className="info-cards-container">
            <div className="info-card">78 Pollution</div>
            <div className="info-card">12 Health</div>
            <div className="info-card">13 Traffic Rush</div>
            <div className="info-card">1 Vehicle</div>
          </div>
        </section>

        <section className="custom-alerts" id="alerts">
          <h2>Custom Alerts</h2>
          <div className="alert-buttons">
            <button>Alerts</button>
            <button>Notifications</button>
            <button>Updates</button>
          </div>
        </section>

        <section className="health-impact" id="health-impact">
          <h2>Health Impact Forecasting</h2>
          <div className="forecast-grid">
            <div>Air Quality</div>
            <div>Climate Data</div>
            <div>Traffic Rush Hours</div>
            <div>Smart Homes</div>
          </div>
        </section>
      </main>

      {/* Notifications Section */}
      <section className="notifications">
        <h3>Recent Notifications</h3>
        <div className="notification-grid">
          <div className="notification-card">
            New Health Alert in your area!
          </div>
          <div className="notification-card">
            Traffic levels are high this morning.
          </div>
          <div className="notification-card">
            New air quality forecast is available.
          </div>
          <div className="notification-card">
            Reminder: Update your custom alerts.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
