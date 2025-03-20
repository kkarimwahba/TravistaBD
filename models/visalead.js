const mongoose = require("mongoose");

const VisaLeadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    agreedToTerms: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["New", "In Progress", "Approved", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaLead", VisaLeadSchema);
