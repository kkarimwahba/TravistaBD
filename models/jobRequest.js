const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "prefer not to say"] },
    maritalStatus: {
      type: String,
      enum: ["married", "single", "prefer not to say"],
    },
    resume: { type: String }, // path or URL to uploaded resume
    note: { type: String },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobRequest", jobRequestSchema);
