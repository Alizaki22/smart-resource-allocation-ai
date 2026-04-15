const mongoose = require("mongoose");

const AllocationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true
  },

  requestData: {
    cpu: Number,
    memory: Number
  },

  aiPrediction: {
    allocated: Boolean,
    score: Number
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Allocation",
  AllocationSchema
);