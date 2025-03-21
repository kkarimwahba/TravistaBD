const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const router = express.Router();

router.post("/", createHotel); // No authentication
router.get("/", getAllHotels); // No authentication
router.get("/:id", getHotelById); // No authentication
router.put("/:id", updateHotel); // No authentication
router.delete("/:id", deleteHotel); // No authentication

module.exports = router;
