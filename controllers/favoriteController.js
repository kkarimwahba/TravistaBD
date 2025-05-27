const Favorite = require("../models/favorite");
const User = require("../models/user");
const Package = require("../models/packages");
const Blog = require("../models/blogs");
const Notification = require("../models/notification");

// Add an item to favorites
const addFavorite = async (req, res) => {
  try {
    const { userId, itemType, itemId } = req.body;

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Create favorite object with common fields
    const favoriteData = {
      user: userId,
      itemType,
    };

    // Verify item exists based on type
    if (itemType === "package") {
      const packageExists = await Package.findById(itemId);
      if (!packageExists)
        return res.status(404).json({ message: "Package not found" });
      favoriteData.package = itemId;

      // Create notification
      const notification = new Notification({
        type: "Favorite",
        description: `New favorite added by ${userExists.firstName} ${userExists.lastName}. Package: ${packageExists.packageName}`,
      });
      await notification.save();
    } else if (itemType === "blog") {
      const blogExists = await Blog.findById(itemId);
      if (!blogExists)
        return res.status(404).json({ message: "Blog not found" });
      favoriteData.blog = itemId;

      // Create notification
      const notification = new Notification({
        type: "Favorite",
        description: `New favorite added by ${userExists.firstName} ${userExists.lastName}. Blog: ${blogExists.title}`,
      });
      await notification.save();
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    // Create new favorite
    const newFavorite = new Favorite(favoriteData);
    await newFavorite.save();

    res
      .status(201)
      .json({ message: "Added to favorites", favorite: newFavorite });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Item already in favorites" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all favorites for a user with populated data
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { type } = req.query; // Optional filter by type

    const query = { user: userId };
    if (type) query.itemType = type;

    const favorites = await Favorite.find(query)
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      })
      .populate("package")
      .populate("blog")
      .sort({ createdAt: -1 });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Check if an item is in user's favorites
const checkFavorite = async (req, res) => {
  try {
    const { userId, itemType, itemId } = req.params;

    const query = {
      user: userId,
      itemType,
    };

    if (itemType === "package") {
      query.package = itemId;
    } else if (itemType === "blog") {
      query.blog = itemId;
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const favorite = await Favorite.findOne(query);

    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const { userId, itemType, itemId } = req.params;

    const query = {
      user: userId,
      itemType,
    };

    if (itemType === "package") {
      query.package = itemId;
    } else if (itemType === "blog") {
      query.blog = itemId;
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const result = await Favorite.findOneAndDelete(query);

    if (!result) return res.status(404).json({ message: "Favorite not found" });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all favorites (admin only)
const getAllFavorites = async (req, res) => {
  try {
    const { type } = req.query; // Optional filter by type

    const query = {};
    if (type) query.itemType = type;

    const favorites = await Favorite.find(query)
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      })
      .populate("package")
      .populate("blog")
      .sort({ createdAt: -1 });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  checkFavorite,
  removeFavorite,
  getAllFavorites,
};
