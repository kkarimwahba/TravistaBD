const express = require("express");
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getCitiesByCountry,
} = require("../controllers/citiesController");

const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

const router = express.Router();

router.post("/", createCity); // Create a city
router.get("/", getAllCities); // Get all cities
router.get("/:id", getCityById); // Get a single city
router.put("/:id", updateCity); // Update a city
router.delete("/:id", deleteCity); // Delete a city
router.get("/country/:countryId", getCitiesByCountry); // <-- New Route

module.exports = router;
