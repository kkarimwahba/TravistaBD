const mongoose = require("mongoose");
const Counter = require("./counter");
const TourCategorySchema = new mongoose.Schema(
  {
    tourCategoryId: { type: Number, unique: true }, // Auto-incrementing ID
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
// Auto-increment countryId before saving a new country
TourCategorySchema.pre("save", async function (next) {
  if (!this.tourCategoryId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "TourCategory" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.tourCategoryId = counter.count;
  }
  next();
});
module.exports = mongoose.model("TourCategory", TourCategorySchema);
