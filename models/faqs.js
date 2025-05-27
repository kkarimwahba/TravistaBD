const mongoose = require("mongoose");
const Counter = require("./counter"); // Import counter for auto-increment

const faqSchema = new mongoose.Schema(
  {
    faqId: { type: Number, unique: true }, // Auto-increment ID
    question: { type: String, required: true },
    answer: { type: String, required: true },
    subject: { type: String, required: true }, // Subject category
    isVisible: { type: Boolean, default: true }, // Controls visibility on frontend
  },
  { timestamps: true }
);

// Auto-increment `faqId` before saving
faqSchema.pre("save", async function (next) {
  if (!this.faqId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "FAQ" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.faqId = counter.count;
  }
  next();
});

module.exports = mongoose.model("FAQ", faqSchema);
