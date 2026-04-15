const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  availability: {
    type: Boolean,
    default: true
  },

  capacity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Resource", ResourceSchema);