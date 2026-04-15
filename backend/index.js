const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/predict"));

// MongoDB connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/smart-resource-allocation-ai")
  .then(() => console.log("✅ MongoDB Connected (Team DB)"))
  .catch(err => console.log("❌ DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});