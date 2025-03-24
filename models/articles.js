const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String }, // Image URL
  tags: [{ type: String }], // Multiple tags
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ["Draft", "Published", "Scheduled"],
    default: "Draft",
  },
  scheduledDate: { type: Date }, // Only for scheduled articles
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
