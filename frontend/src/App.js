// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const About = lazy(() => import("./pages/About/about"));
const Contact = lazy(() => import("./pages/Contact/contact"));
const ServicesPage = lazy(() => import("./pages/Services/services")); // Add ServicesPage
const Dashboard = lazy(() => import("./pages/Dashboard/dashboard"));
const Reports = lazy(() => import('./pages/Reports/reports'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesPage />} /> {/* Add ServicesPage Route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add ServicesPage Route */}
          <Route path="/reports" element={<Reports />} /> 
                  
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
