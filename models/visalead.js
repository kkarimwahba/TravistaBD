const mongoose = require("mongoose");

const VisaLeadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    purpose: { type: String, required: true },
    invitation: { type: String, required: true },
    schengenBefore: { type: String, enum: ["Yes", "No"], required: true },
    travelDate: { type: Date, required: true },
    jobStatus: { type: String, required: true },
    visaRenewal: { type: String, enum: ["Yes", "No"], required: true },
    bankStatement: { type: String, required: true }, // File URL
    agreedToTerms: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["New", "In Progress", "Approved", "Rejected"],
      default: "New",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaLead", VisaLeadSchema);
