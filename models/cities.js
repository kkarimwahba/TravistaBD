const mongoose = require("mongoose");
const Counter = require("./counter"); // Import Counter model

const citySchema = new mongoose.Schema(
  {
    cityId: { type: Number, unique: true }, // Auto-incrementing ID
    name: { type: String, required: true, unique: true },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    }, // Reference to Country
  },
  { timestamps: true }
);

// Auto-increment cityId before saving a new city
citySchema.pre("save", async function (next) {
  if (!this.cityId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "City" }, // Identify the model counter
      { $inc: { count: 1 } }, // Increment count
      { new: true, upsert: true } // Create if not exists
    );
    this.cityId = counter.count;
  }
  next();
});

module.exports = mongoose.model("City", citySchema);
