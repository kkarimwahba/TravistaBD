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
    const favorites = await Favorite.find({ userId });

    // Separate itemIds by type
    const packageIds = favorites
      .filter((f) => f.itemType === "package")
      .map((f) => f.itemId);

    const blogIds = favorites
      .filter((f) => f.itemType === "blog")
      .map((f) => f.itemId);

    // Get full items
    const packages = await Package.find({ _id: { $in: packageIds } });
    const blogs = await Blog.find({ _id: { $in: blogIds } });

    // Map enriched favorites
    const enrichedFavorites = favorites.map((fav) => {
      let item = null;
      if (fav.itemType === "package") {
        item = packages.find((p) => p._id.toString() === fav.itemId.toString());
      } else {
        item = blogs.find((b) => b._id.toString() === fav.itemId.toString());
      }
      return {
        ...fav.toObject(),
        item,
      };
    });

    res.json(enrichedFavorites);
  } catch (err) {
    console.error("❌ Error in getMyFavorites:", err);
    res.status(500).json({ message: "Failed to load favorites." });
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
