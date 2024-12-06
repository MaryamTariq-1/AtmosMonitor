// src/pages/LandingPage/LandingPage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing in the field
    setErrors({
      ...errors,
      [name]: "",
    });

        if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Name can only contain letters and spaces.",
          }));

        }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation: required, letters/spaces only, min 3 characters
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);

    // Return true if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate sending data
      setStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } else {
      setStatus(""); // Clear any previous status message if validation fails
    }
  };
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
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
          <a
            href="#contact-section"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to AtmosMonitor</h1>
          <p>Your Gateway to Real-Time Environmental Insights</p>
          <button onClick={() => navigate("/signup")} className="hero-button">
            Explore More
          </button>
        </div>
      </section>
      {/* Features Section */}
      <section className="features" id="features">
        <h2>Main Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-Time Monitoring</h3>
            <p>
              Stay updated with up-to-the-minute data on air quality and weather
              conditions.
            </p>
          </div>
          <div className="feature-card">
            <h3>Data Visualization</h3>
            <p>
              Interactive charts and graphs provide clear and concise views of
              your environment.
            </p>
          </div>
          <div className="feature-card">
            <h3>Health Impact Forecasting</h3>
            <p>
              Predict potential health risks based on environmental data trends.
            </p>
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
            <p>
              Optimize your home’s environment with seamless device
              connectivity.
            </p>
          </div>
        </div>
      </section>
      {/* Subscription Section */}
      <section className="subscription-section">
        <h2>Choose Your Plan</h2>
        <div className="subscription-cards">
          <div className="subscription-card">
            <h3>7-Day Free Trial</h3>
            <p>Try out all the features free for a week.</p>
            <button onClick={() => navigate("/subscription?plan=trial")}>
              Start Free Trial
            </button>
          </div>
          <div className="subscription-card">
            <h3>Monthly Plan</h3>
            <p>Perfect for short-term needs. Cancel anytime.</p>
            <button onClick={() => navigate("/subscription?plan=monthly")}>
              Subscribe Monthly
            </button>
          </div>
          <div className="subscription-card">
            <h3>Yearly Plan</h3>
            <p>Best value for long-term users. Save more!</p>
            <button onClick={() => navigate("/subscription?plan=yearly")}>
              Subscribe Yearly
            </button>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact-section" className="contact-section">
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <p>
            Have questions or need support? Fill out the form below to get in
            touch with us.
          </p>

          {status && <p className="status-message success">{status}</p>}

          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
      {/* Footer Section */}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>Or reach us at:</p>
              <p>
                Email:{" "}
                <a href="mailto:support@atmosmonitor.com">
                  support@atmosmonitor.com
                </a>
              </p>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 1234 Air Quality St, City, Country</p>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#linkedIN" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#Twitter" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AtmosMonitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
