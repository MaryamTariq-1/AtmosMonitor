// src/pages/LandingPage/LandingPage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import aqmImage from "../../assets/images/aqm.jfif";
import riskForecastImage from "../../assets/images/RiskForecast.jfif";
import alertImage from "../../assets/images/Alert.jfif";
import predictionImage from "../../assets/images/predicton.jfif";
import smartwatchesImage from "../../assets/images/smartwatches.jfif";
import dataVisualImage from "../../assets/images/datavisual.jfif";
import DrFayyaz from "../../assets/images/Dr Fayyaz.jpg";
import Razeen from "../../assets/images/Razeen.jpg";
import Rayyan from "../../assets/images/rayyan.png";
import Maryam from "../../assets/images/maryam.jfif";

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
const emailRegex =
  /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com|example\.com|hotmail\.com|mail\.com|[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;

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



  const [selectedPlan, setSelectedPlan] = useState(null);
  
    const plans = [
      {
        id: 1,
        name: "7-Day Free Trial",
        description: "Enjoy the premium features for 7 days, completely free!",
        price: "₨ 0.00",
        duration: "7 days",
        features: {
          "Login and Sign-Up": true,
          "Manage Accounts": true,
          "Monitor Environment": true,
          "View Dashboard": true,
          "Provide Recommendations": false,
          "Manage Alerts": false,
          "Integrate Smart Devices": false,
        },
      },
      {
        id: 2,
        name: "Monthly Plan",
        description: "Get access to premium features for one month.",
        price: "₨ 25,000",
        duration: "1 month",
        features: {
          "Login and Sign-Up": true,
          "Manage Accounts": true,
          "Monitor Environment": true,
          "View Dashboard": true,
          "Provide Recommendations": true,
          "Manage Alerts": true,
          "Integrate Smart Devices": false,
        },
      },
      {
        id: 3,
        name: "Yearly Plan",
        description: "Get access to premium features for one full year.",
        price: "₨ 275,000",
        duration: "1 year",
        features: {
          "Login and Sign-Up": true,
          "Manage Accounts": true,
          "Monitor Environment": true,
          "View Dashboard": true,
          "Provide Recommendations": true,
          "Manage Alerts": true,
          "Integrate Smart Devices": true,
        },
      },
    ];
  
    const handleBuySubscription = (planId) => {
      const plan = plans.find((p) => p.id === planId); // Find the selected plan based on ID
      setSelectedPlan(plan); // Store the selected plan in the state
      navigate("/checkout", { state: { selectedPlan: plan } }); // Pass the selected plan data to Checkout page using state
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
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              document
                .getElementById("features") // Target the "about-section" element
                .scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
            }}
          >
            Services
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              document
                .getElementById("about-section") // Target the "about-section" element
                .scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
            }}
          >
            About
          </a>
          {/*   <a href="#subplan" onClick={() => navigate("/subplan")}>
            Subscription Plan
          </a>*/}
          <a
            href="#subscription-header"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("subscription-header")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Subscription Plan
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

      <section className="hero">
        {/* Hero Content */}
        <div className="hero-content">
          {/* Video Background */}

          <h1>Welcome to AtmosMonitor</h1>
          <p>Your Gateway to Real-Time Environmental Insights</p>
          <button onClick={() => navigate("/signup")} className="hero-button">
            Explore More
          </button>
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/Videos/earthloop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h1>Our Services</h1>
        <p className="features-subtitle">
          See what we provide with AtmosMonitor.
        </p>
        <div className="feature-cards">
          <div className="feature-card">
            <img
              src={aqmImage}
              alt="Real-time Air Quality Monitoring"
              className="feature-image"
            />
            <h3>View Dashboard</h3>
            <p>Plan your commute with insights on traffic and air quality.</p>
          </div>
          <div className="feature-card">
            <img
              src={predictionImage}
              alt="Traffic and Pollution Prediction"
              className="feature-image"
            />
            <h3>Monitoring Environment</h3>
            <p>Stay updated with data on air quality and weather conditions.</p>
          </div>
          <div className="feature-card">
            <img
              src={dataVisualImage}
              alt="Data Visualization"
              className="feature-image"
            />
            <h3>Visualize Data</h3>
            <p>
              Interactive charts and graphs provide clear and concise views of
              your environment.
            </p>
          </div>
          <div className="feature-card">
            <img
              src={riskForecastImage}
              alt="Health Risk Forecasting"
              className="feature-image"
            />
            <h3>Provide Recommendations</h3>
            <p>
              Predict potential health risks based on environmental data trends.
            </p>
          </div>
          <div className="feature-card">
            <img
              src={alertImage}
              alt="Custom Alerts"
              className="feature-image"
            />
            <h3>Managing Alerts</h3>
            <p>Set and receive alerts for specific environmental thresholds.</p>
          </div>
          <div className="feature-card">
            <img
              src={smartwatchesImage}
              alt="Smart Device Integration"
              className="feature-image"
            />
            <h3>Integrating Smart Devices</h3>
            <p>
              Optimize your home’s environment with seamless device
              connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about-section">
        <h1>About Us</h1>
        <p>
          AtmosMonitor is an innovative, state-of-the-art platform designed to
          revolutionize the way we monitor, analyze, and respond to air quality.
          With air pollution becoming an increasingly pressing global issue,
          AtmosMonitor aims to empower individuals, communities, and
          organizations with tools and insights for a healthier and more
          sustainable future.
        </p>
        <p>
          Resize the browser window to see that this page is responsive by the
          way.
        </p>

        <h2 style={{ textAlign: "center" }}>Our Team</h2>

        <div className="team-cards">
          <div className="team-card">
            <img src={DrFayyaz} alt="DrFayyaz" style={{ width: "100%" }} />
            <div className="team-card-container">
              <h2>Dr. Mhammad Fayyaz</h2>
              <p className="title">Supervisors</p>
              <p>
                Passionate about sustainability and innovation in environmental
                technologies.
              </p>
              <p>m.fayyaz@nu.edu.pk</p>
              <p>
                <button
                  className="button"
                  onClick={() =>
                    (window.location.href = "mailto:m.fayyaz@nu.edu.pk")
                  }
                >
                  Contact
                </button>
              </p>
            </div>
          </div>

          <div className="team-card">
            <img src={Razeen} alt="razeen" style={{ width: "100%" }} />
            <div className="team-card-container">
              <h2>Razeen Shahid</h2>
              <p className="title">CEO</p>
              <p>
                Passionate about sustainability and innovation in environmental
                technologies.
              </p>
              <p>f219224@cfd.nu.edu.pk</p>
              <p>
                <button
                  className="button"
                  onClick={() =>
                    (window.location.href = "mailto:f219224@cfd.nu.edu.pk")
                  }
                >
                  Contact
                </button>
              </p>
            </div>
          </div>

          <div className="team-card">
            <img src={Rayyan} alt="Rayyan" style={{ width: "100%" }} />
            <div className="team-card-container">
              <h2>Ahmad Rayyan</h2>
              <p className="title">Art Director</p>
              <p>Leading the design and user experience of our products.</p>
              <p>f219266@cfd.nu.edu.pk</p>
              <p>
                <button
                  className="button"
                  onClick={() =>
                    (window.location.href = "mailto:f219266@cfd.nu.edu.pk")
                  }
                >
                  Contact
                </button>
              </p>
            </div>
          </div>

          <div className="team-card">
            <img src={Maryam} alt="Maryam" style={{ width: "100%" }} />
            <div className="team-card-container">
              <h2>Maryam Tariq</h2>
              <p className="title">Product Designer</p>
              <p>
                Designing user-friendly solutions to meet the needs of our
                users.
              </p>
              <p>f219137@cfd.nu.edu.pk</p>
              <p>
                <button
                  className="button"
                  onClick={() =>
                    (window.location.href = "mailto:f219137@cfd.nu.edu.pk")
                  }
                >
                  Contact
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <h2 className="subscription-header" id="subscription-header">
        Choose Your Subscription Plan
      </h2>
      <div className="subscription-container">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <h3>{plan.name}</h3>
            </div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              <h4>{plan.price}</h4>
              <span className="plan-duration">{plan.duration}</span>
            </div>

            <div className="plan-features">
              {Object.keys(plan.features).map((feature, index) => (
                <div key={index} className="feature-item">
                  <span
                    className={
                      plan.features[feature]
                        ? "feature-checked"
                        : "feature-unchecked"
                    }
                  >
                    {plan.features[feature] ? "✓" : "✘"}
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              className="buy-button"
              onClick={() => handleBuySubscription(plan.id)}
            >
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>

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
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                document
                  .getElementById("features") // Target the "about-section" element
                  .scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
              }}
            >
              Services
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
