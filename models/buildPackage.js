// models/BuildPackage.js

const mongoose = require("mongoose");

const buildPackageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Personal Trip", "Senior Trip", "Business Trip"],
      required: true,
    },
    departureCountry: { type: String, required: true },
    departureCity: { type: String, required: true },
    numberOfTravellers: { type: Number, required: true },
    budgetPerPerson: { type: Number, required: true },
    currency: { type: String, required: true },
    travelDate: { type: Date, required: true },
    flexibility: { type: Number, required: true }, // in days
    numberOfNights: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BuildPackage", buildPackageSchema);
