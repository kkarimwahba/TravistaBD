const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["contactUs", "faq"], // Differentiates between Contact Us and FAQ
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    agreedToTerms: { type: Boolean, required: true }, // User must agree to terms
    status: {
      type: String,
      enum: ["New", "Reviewed", "Resolved"],
      default: "New",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forms", FormSchema);
