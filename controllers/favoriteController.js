const Favorite = require("../models/favorite");
const User = require("../models/user");
const Package = require("../models/packages");
const Notification = require("../models/notification");

// Add a package to favorites
const addFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    // Verify user and package exist
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const packageExists = await Package.findById(packageId);
    if (!packageExists)
      return res.status(404).json({ message: "Package not found" });

    // Create new favorite
    const newFavorite = new Favorite({
      user: userId,
      package: packageId,
    });

    await newFavorite.save();
    const notification = new Notification({
      type: "Favorite",
      description: `New favorite added by ${userExists.firstName} ${userExists.lastName}. Package: ${packageExists.packageName}`,
    });
    await notification.save();
    res
      .status(201)
      .json({ message: "Added to favorites", favorite: newFavorite });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Package already in favorites" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all favorites for a user with populated data
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;

    const favorites = await Favorite.find({ user: userId })
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      })
      .populate("package")
      .sort({ createdAt: -1 });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Check if a package is in user's favorites
const checkFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.params;

    const favorite = await Favorite.findOne({
      user: userId,
      package: packageId,
    });

    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.params;

    const result = await Favorite.findOneAndDelete({
      user: userId,
      package: packageId,
    });

    if (!result) return res.status(404).json({ message: "Favorite not found" });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all favorites (admin only)
const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      })
      .populate("package")
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
