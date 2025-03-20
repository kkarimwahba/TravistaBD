const express = require("express");
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/citiesController");
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

const router = express.Router();

router.post("/", authMiddleware, createCity); // Create a city
router.get("/", getAllCities); // Get all cities
router.get("/:id", getCityById); // Get a single city
router.put("/:id", updateCity); // Update a city
router.delete("/:id", deleteCity); // Delete a city

module.exports = router;
