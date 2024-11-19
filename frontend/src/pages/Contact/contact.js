// src/pages/Contact/Contact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  const navigate = useNavigate();

  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for handling form submission status
  const [status, setStatus] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming form submission logic here, such as calling an API endpoint
    setStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <nav className="navbar">
        <div className="navbar-logo">AtmosMonitor</div>
        <div className="navbar-links">
          <a onClick={() => navigate('/')}>Home</a>
          <a onClick={() => navigate('/features')}>Features</a>
          <a onClick={() => navigate('/services')}>Services</a>
          <a onClick={() => navigate('/reports')}>Reports</a>
          <a onClick={() => navigate('/about')}>About</a>
          <a href="#dashboard" onClick={() => navigate('/dashboard')}>Dashboard</a>
        </div>
        <div className="navbar-buttons">
          <button onClick={() => navigate('/signin')}>Sign In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>Have questions or need support? Fill out the form below to get in touch with us.</p>

        {status && <p className="status-message">{status}</p>}

        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <p>Or reach us at:</p>
          <p>Email: support@atmosmonitor.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 1234 Air Quality St, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
