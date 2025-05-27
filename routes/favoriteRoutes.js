const express = require("express");
const {
  addFavorite,
  getUserFavorites,
  checkFavorite,
  removeFavorite,
  getAllFavorites,
} = require("../controllers/favoriteController");

const router = express.Router();

// Add authentication middleware to protect these routes
router.post("/", addFavorite);
router.get("/user/:userId", getUserFavorites);
router.get("/check/:userId/:itemType/:itemId", checkFavorite);
router.delete("/:userId/:itemType/:itemId", removeFavorite);
router.get("/", getAllFavorites); // Admin route

module.exports = router;
