const mongoose = require("mongoose");
const Counter = require("./counter"); // Import counter for auto-increment

const socialMediaSchema = new mongoose.Schema(
  {
    socialId: { type: Number, unique: true }, // Auto-increment ID
    platform: { type: String, required: true }, // e.g., Facebook, Twitter
    url: { type: String, required: true }, // Social media URL
  },
  { timestamps: true }
);

// Auto-increment `socialId`
socialMediaSchema.pre("save", async function (next) {
  if (!this.socialId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "SocialMedia" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.socialId = counter.count;
  }
  next();
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
