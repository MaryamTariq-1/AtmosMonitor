const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./library/auth");
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/AtmosMonitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/auth", authRoutes);

// Server start
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
