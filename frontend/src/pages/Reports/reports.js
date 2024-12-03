// src/pages/Reports/Reports.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reports.css';

const Reports = () => {
  const navigate = useNavigate();
  
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch the reports from API or backend
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="reports-page">
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/features")}>Features</a>
          <a onClick={() => navigate("/services")}>Services</a>
          <a onClick={() => navigate("/reports")}>Reports</a>
          <a onClick={() => navigate("/about")}>About</a>
          <a onClick={() => navigate("/contact")}>Contact</a>
          <a href="#dashboard" onClick={() => navigate("/dashboard")}>Dashboard</a>
        </div>
        <div className="navbar-buttons">
          <button onClick={() => navigate("/signin")}>Sign In</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

      <div className="reports-content">
        <h1>Reports</h1>
        <p>
          View detailed reports of air quality, forecasts, and health risks.
        </p>

        {/* Report List */}
        <div className="reports-list">
          <table>
            <thead>
              <tr>
                <th>Report Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.type}</td>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => navigate(`/report/${report.id}`)}>
                        View
                      </button>
                      <button onClick={() => window.open(report.downloadUrl)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No reports available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
