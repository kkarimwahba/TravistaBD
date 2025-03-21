const mongoose = require("mongoose");
const Counter = require("./counter"); // Import counter model for auto-increment

const newsletterSchema = new mongoose.Schema(
  {
    subscriberId: { type: Number, unique: true }, // Auto-increment ID
    email: { type: String, required: true, unique: true },
    subscribed: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now }, // Date of subscription
  },
  { timestamps: true }
);

// Auto-increment `subscriberId` before saving
newsletterSchema.pre("save", async function (next) {
  if (!this.subscriberId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Newsletter" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.subscriberId = counter.count;
  }
  next();
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
