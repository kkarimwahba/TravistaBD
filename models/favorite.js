// models/Favorite.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  itemType: {
    type: String,
    enum: ["package", "blog"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Add unique index on userId + itemId + itemType
favoriteSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
