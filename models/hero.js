const mongoose = require("mongoose");
const Counter = require("./counter"); // Ensure to import the Counter model

const heroSchema = new mongoose.Schema({
  heroId: { type: Number, unique: true }, // Auto-incrementing ID
  imageUrl: String,
  caption: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

heroSchema.pre("save", async function (next) {
  if (!this.heroId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Hero" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.heroId = counter.count;
  }
  next();
});

module.exports = mongoose.model("Hero", heroSchema);
