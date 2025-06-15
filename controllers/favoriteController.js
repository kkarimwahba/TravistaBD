// controllers/favoriteController.js
const Favorite = require("../models/favorite");
const Package = require("../models/packages");
const Blog = require("../models/blogs");
const User = require("../models/user");

// Add to favorites
exports.addFavorite = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user._id;

  console.log("Adding favorite for user:", userId);
  console.log("Item ID:", itemId);
  console.log("Item Type:", itemType);

  try {
    const existing = await Favorite.findOne({ userId, itemId, itemType });
    if (existing) {
      return res.status(400).json({ message: "Already favorited." });
    }

    const favorite = await Favorite.create({ userId, itemId, itemType });
    res.status(201).json(favorite);
  } catch (err) {
    console.error("❌ Error in addFavorite:", err);
    res.status(500).json({ message: "Failed to add favorite." });
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

    const packageIds = favorites
      .filter((fav) => fav.itemType === "package")
      .map((fav) => fav.itemId);

    const blogIds = favorites
      .filter((fav) => fav.itemType === "blog")
      .map((fav) => fav.itemId);

    const packages = await Package.find({ _id: { $in: packageIds } });
    const blogs = await Blog.find({ _id: { $in: blogIds } });

    const enrichedFavorites = favorites.map((fav) => {
      const item =
        fav.itemType === "package"
          ? packages.find((p) => p._id.toString() === fav.itemId.toString())
          : blogs.find((b) => b._id.toString() === fav.itemId.toString());

      return {
        _id: fav._id,
        itemType: fav.itemType,
        itemId: fav.itemId,
        createdAt: fav.createdAt,
        item, // this will contain full blog or package object
      };
    });

    res.json(enrichedFavorites);
  } catch (error) {
    console.error("❌ Error in getMyFavorites:", error);
    res.status(500).json({ message: "Failed to fetch favorites." });
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
