// routes/favoriteRoutes.js
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

router.post("/", favoriteController.addFavorite);
router.delete("/remove", favoriteController.removeFavorite);
router.get("/my", favoriteController.getMyFavorites);
router.get("/packages", favoriteController.getFavoritedPackages);

module.exports = router;
