const mongoose = require("mongoose");
const Counter = require("./counter"); // Import Counter model

const countrySchema = new mongoose.Schema(
  {
    countryId: { type: Number, unique: true }, // Auto-incrementing ID
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true }, // Country code (e.g., "EG" for Egypt)
  },
  { timestamps: true }
);

// Auto-increment countryId before saving a new country
countrySchema.pre("save", async function (next) {
  if (!this.countryId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Country" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.countryId = counter.count;
  }
  next();
});

module.exports = mongoose.model("Country", countrySchema);
