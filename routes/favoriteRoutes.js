const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { protect } = require("../middleware/usersMiddlwareAuth");

router.post("/", protect, favoriteController.addFavorite);
router.delete("/remove", protect, favoriteController.removeFavorite);
router.get("/my", protect, favoriteController.getMyFavorites);
router.get("/packages", favoriteController.getFavoritedPackages);

module.exports = router;
