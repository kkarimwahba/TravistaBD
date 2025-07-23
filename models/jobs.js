const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    responsibilities: [{ type: String }],
    whatWeOffer: [{ type: String }],
    department: { type: String },
    location: { type: String },
    type: { type: String },
    preferredSkills: [{ type: String }],
    notes: [{ type: String }],
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
