const mongoose = require("mongoose");
const Counter = require("./counter"); // For auto-increment hotelId

const hotelSchema = new mongoose.Schema(
  {
    hotelId: { type: Number, unique: true }, // Auto-incremented hotel ID
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    locationURL: { type: String }, // Google Maps or website link
    stars: { type: Number, required: true, min: 1, max: 5 },
    meals: [{ type: String }], // Array of available meal options
    categories: [{ type: String }], // Hotel types: Resort, Business, Budget, etc.
    amenities: [{ type: String }], // E.g., WiFi, Pool, Gym, Parking
    rooms: [
      {
        type: { type: String, required: true }, // Room type (Single, Double, Suite, etc.)
        price: { type: Number, required: true },
        availability: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

// Auto-increment hotelId before saving
hotelSchema.pre("save", async function (next) {
  if (!this.hotelId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Hotel" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.hotelId = counter.count;
  }
  next();
});

module.exports = mongoose.model("Hotel", hotelSchema);
