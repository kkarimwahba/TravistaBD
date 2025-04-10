// models/Comment.js
const mongoose = require("mongoose");
const Counter = require("./counter"); // Import the Counter model

const commentSchema = new mongoose.Schema({
  commentId: { type: Number, unique: true }, // Auto-incrementing ID

  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  memberSince: {
    type: String,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Auto-increment `faqId` before saving
commentSchema.pre("save", async function (next) {
  if (!this.commentId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Comment" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.commentId = counter.count;
  }
  next();
});
module.exports = mongoose.model("Comment", commentSchema);
