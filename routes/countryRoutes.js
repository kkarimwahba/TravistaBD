const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/countryController");

router.get("/", getCountries);
router.get("/:id", getCountryById);
router.post("/", addCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

module.exports = router;
