const express = require("express");
const router = express.Router();

const Allocation = require("../../database/models/Allocation");
const predictController = require("../controllers/predictController");

// POST route
router.post("/predict", predictController);

// GET history
router.get("/history", async (req, res) => {
  try {
    const data = await Allocation.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;