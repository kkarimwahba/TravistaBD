const mongoose = require("mongoose");

const ApplyForPackageSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    default: "+1",
  },
  adults: {
    type: Number,
    required: true,
    min: 1,
  },
  children: {
    type: Number,
    default: 0,
  },
  roomType: {
    type: String,
    enum: ["Single Room", "Double Room", "Triple Room"],
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ApplyForPackage", ApplyForPackageSchema);
