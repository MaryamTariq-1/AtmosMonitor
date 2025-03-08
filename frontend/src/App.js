// src/App.js - Frontend by Maryam
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Contact = lazy(() => import("./pages/LandingPage/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/dashboard"));
const SubPlan = lazy(() => import("./pages/Subscription/SubPlan"));
const Checkout = lazy(() => import("./pages/Subscription/Checkout"));
const ForgotPassword = lazy(() => import("./pages/SignIn/forgetpass")); // Import the ForgotPassword page

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/subplan" element={<SubPlan />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add ForgotPassword Route */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
