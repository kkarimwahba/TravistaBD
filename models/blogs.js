const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  slug: { type: String, unique: true },
  contentTitle: { type: String, required: true }, // Title of the content section
  content: { type: String, required: true }, // Can include <img src="..."> or similar
  featuredImage: { type: String }, // Main image on top of the blog post
  embeddedImages: { type: String }, // Optional: to track embedded image URLs if you want
  seoKeywords: [{ type: String }],
  metaDescription: { type: String, maxlength: 160 }, // For SEO meta description
  category: { type: String, enum: ["stories", "news", "guide"] },
  tags: [{ type: String }], // Change from ObjectId to String
  status: {
    type: String,
    enum: ["draft", "published", "scheduled", "archived"],
    default: "draft",
  },
  scheduledDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
