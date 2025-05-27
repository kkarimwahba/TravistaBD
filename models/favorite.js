const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemType: {
      type: String,
      enum: ["package", "blog"],
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: function () {
        return this.itemType === "package";
      },
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: function () {
        return this.itemType === "blog";
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate favorites
favoriteSchema.index(
  { user: 1, itemType: 1, package: 1 },
  { unique: true, sparse: true }
);
favoriteSchema.index(
  { user: 1, itemType: 1, blog: 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
