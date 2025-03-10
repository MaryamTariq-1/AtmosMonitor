require("dotenv").config(); // Load .env variables securely
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const authRoutes = require("./routes/user");
const paymentRoutes = require("./routes/paymentRoute");

const app = express();

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});

// MongoDB Connection with proper error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process if connection fails
  }
};
connectDB();

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment-intent", paymentRoutes);

// Forgot Password Route (Moved to correct position)
const forgotPasswordRoute = require("./routes/user");
app.use("/api", forgotPasswordRoute);

// Error handling middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
