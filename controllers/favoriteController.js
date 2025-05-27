// controllers/favoriteController.js
const Favorite = require("../models/favorite");
const Package = require("../models/packages");
const Blog = require("../models/blogs");
const User = require("../models/user");

// Add to favorites
exports.addFavorite = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user._id;

  try {
    // Prevent duplicates
    const existing = await Favorite.findOne({ userId, itemId, itemType });
    if (existing) {
      return res.status(400).json({ message: "Already favorited." });
    }

    const favorite = await Favorite.create({ userId, itemId, itemType });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user._id;

  try {
    const result = await Favorite.findOneAndDelete({
      userId,
      itemId,
      itemType,
    });
    if (!result)
      return res.status(404).json({ message: "Favorite not found." });

    res.json({ message: "Removed from favorites." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user's favorites
// controllers/favoriteController.js

exports.getMyFavorites = async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await Favorite.find({ userId }).populate({
      path: "itemId",
      model: function (doc) {
        // Dynamically choose model based on itemType
        return doc.itemType === "package" ? "Package" : "Blog";
      },
      select: function (doc) {
        if (doc.itemType === "package") {
          return "packageName travistaId packagePicture packagePrice departureDate destinations";
        } else {
          return ""; // or 'title content' if needed for blogs
        }
      },
    });

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all favorited packages with user & package populated
// controllers/favoriteController.js

exports.getFavoritedPackages = async (req, res) => {
  try {
    const favorites = await Favorite.find({ itemType: "package" })
      .populate({
        path: "userId",
        select: "firstName lastName email phoneNumber",
      })
      .populate({
        path: "itemId",
        model: "Package",
        select: "packageName travistaId packagePicture",
      });

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
