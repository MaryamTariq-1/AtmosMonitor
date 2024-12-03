import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./about.css";

import team1 from "../../pages/About/Ahmed.jfif"; 
import team2 from "../../pages/About/Razeen.jfif";  
import team3 from "../../pages/About/maryam.jfif";  

const About = () => {
  const navigate = useNavigate(); // Define navigate here

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a href="#home" onClick={() => navigate("/")}>
            Home
          </a>
          <a href="#services" onClick={() => navigate("/services")}>
            Services
          </a>
          <a href="#about" onClick={() => navigate("/about")}>
            About
          </a>
          <a href="#dashboard" onClick={() => navigate("/dashboard")}>
            Dashboard
          </a>
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

      {/* About Section */}
      <section className="about-section">
        <h1>About Us</h1>
        <p>
          We are a passionate team focused on providing real-time air quality
          monitoring and solutions for a healthier future.
        </p>
        <p>
          Resize the browser window to see that this page is responsive by the
          way.
        </p>
      </section>

      <h2 style={{ textAlign: "center" }}>Our Team</h2>

      <div className="row">
        <div className="column">
          <div className="card">
            <img src={team1} alt="Jane" style={{ width: "100%" }} />
            <div className="container">
              <h2>Jane Doe</h2>
              <p className="title">CEO & Founder</p>
              <p>
                Passionate about sustainability and innovation in environmental
                technologies.
              </p>
              <p>jane@example.com</p>
              <p>
                <button className="button" onClick={() => navigate("/contact")}>
                  Contact
                </button>
              </p>{" "}
              {/* Example onClick for navigate */}
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={team2} alt="Mike" style={{ width: "100%" }} />
            <div className="container">
              <h2>Mike Ross</h2>
              <p className="title">Art Director</p>
              <p>Leading the design and user experience of our products.</p>
              <p>mike@example.com</p>
              <p>
                <button className="button" onClick={() => navigate("/contact")}>
                  Contact
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={team3} alt="John" style={{ width: "100%" }} />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Product Designer</p>
              <p>
                Designing user-friendly solutions to meet the needs of our
                users.
              </p>
              <p>john@example.com</p>
              <p>
                <button className="button" onClick={() => navigate("/contact")}>
                  Contact
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
