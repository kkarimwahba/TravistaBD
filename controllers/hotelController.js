const Hotel = require("../models/hotels");

// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res
      .status(201)
      .json({ message: "Hotel added successfully", hotel: newHotel });
  } catch (error) {
    console.error("Hotel creation error:", error);
    res.status(500).json({ message: "Failed to add hotel", error });
  }
};
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ hotelId: 1 });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotels", error });
  }
};
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ hotelId: req.params.id });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotel", error });
  }
};
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { hotelId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedHotel)
      return res.status(404).json({ message: "Hotel not found" });
    res
      .status(200)
      .json({ message: "Hotel updated successfully", updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Failed to update hotel", error });
  }
};
const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findOneAndDelete({
      hotelId: req.params.id,
    });
    if (!deletedHotel)
      return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel", error });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
