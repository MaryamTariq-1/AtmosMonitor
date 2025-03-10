require("dotenv").config(); // Load .env variables securely at the top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// backend/server.js
const forgotPasswordRoute = require('./routes/user'); // Make sure it's the correct path

// Routes import
const authRoutes = require("./routes/user");
const paymentRoutes = require("./routes/paymentRoute");

const app = express();

// ✅ Middleware setup
app.use(cors({
  origin: "*",
}));
app.use(express.json()); // ✅ Required to parse JSON body from requests

// Debugging - Log incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment-intent", paymentRoutes);

// Error handling middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);


// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


app.use('/api', forgotPasswordRoute);



