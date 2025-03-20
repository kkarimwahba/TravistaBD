const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  model: { type: String, required: true, unique: true }, // Model name (e.g., "City")
  count: { type: Number, default: 0 }, // Auto-increment counter
});

module.exports = mongoose.model("Counter", counterSchema);
