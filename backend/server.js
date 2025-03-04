require("dotenv").config(); // Load environment variables from .env file
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoute");

const mongoose = require("mongoose");
const authRoutes = require("./library/auth");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // React frontend URL
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 3001; // Use PORT from .env or default to 3001
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/AtmosMonitor"; // Fallback to default URI if not set

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/auth", authRoutes);

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for local development or configure as needed
app.use(cors());

// Stripe-related routes
//app.use('/api/payment', paymentRoutes);

// Payment route setup
app.use('/api/payment-intent', paymentRoutes);  // This maps to the routes/payment.js file

// Error handling middleware should be last
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 // Add this after your middleware

