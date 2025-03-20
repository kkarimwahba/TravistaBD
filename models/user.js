const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: Date },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    sessionToken: { type: String, default: null }, // Store session token
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
