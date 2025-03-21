const express = require("express");
const {
  createSeason,
  getAllSeasons,
  getSeasonById,
  updateSeason,
  deleteSeason,
} = require("../controllers/seasonController");

const router = express.Router();

router.post("/", createSeason); // Create a season
router.get("/", getAllSeasons); // Get all seasons
router.get("/:id", getSeasonById); // Get a single season
router.put("/:id", updateSeason); // Update a season
router.delete("/:id", deleteSeason); // Delete a season

module.exports = router;
