const mongoose = require("mongoose");
const Counter = require("./counter"); // Import counter model

const seasonSchema = new mongoose.Schema(
  {
    seasonId: { type: Number, unique: true },
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Auto-increment seasonId before saving
seasonSchema.pre("save", async function (next) {
  if (!this.seasonId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Season" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.seasonId = counter.count;
  }
  next();
});

module.exports = mongoose.model("Season", seasonSchema);
