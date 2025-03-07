require("dotenv").config(); // Load environment variables from .env file
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoute");
const mongoose = require("mongoose");
const authRoutes = require("./library/auth"); // NOTE: Change this to our updated auth routes file
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
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/AtmosMonitor";

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Mount authentication routes
// Update the require path to our auth routes file.
// For Option A above, change the require as follows:
const authApiRoutes = require("./routes/user");
app.use("/api/auth", authApiRoutes);

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for local development or configure as needed
app.use(cors());

// Stripe-related routes
app.use('/api/payment-intent', paymentRoutes);  // Maps to routes/paymentRoute.js

// Error handling middleware should be last
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
