require("dotenv").config(); // Load .env variables securely at the top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes import
const authRoutes = require("./routes/user");
const paymentRoutes = require("./routes/paymentRoute");

// Initialize Express App
const app = express();

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/AtmosMonitor";

// Middleware setup
app.use(cors({
  origin: "*", // Update with frontend URL in production
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment-intent", paymentRoutes);

// Error handling middleware (at the end!)
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
