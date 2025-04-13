// models/Tour.js
const mongoose = require("mongoose");
const Counter = require("./counter");
const DayProgramSchema = new mongoose.Schema({
  dayNumber: Number,
  title: String,
  date: Date,
  city: String,
  country: String,
  description: [String],
  price: {
    included: { type: Boolean, default: false },
    excluded: {
      adult: { type: Number },
      child: { type: Number },
    },
  },
});

const TourSchema = new mongoose.Schema({
  tourId: { type: Number, unique: true }, // Auto-incrementing ID
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourCategory",
    required: true,
  },
  country: { type: String, required: true },
  city: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  dailyPrograms: [DayProgramSchema],
});
// Auto-increment countryId before saving a new country
TourSchema.pre("save", async function (next) {
  if (!this.tourId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Tour" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.tourId = counter.count;
  }
  next();
});
module.exports = mongoose.model("Tour", TourSchema);
