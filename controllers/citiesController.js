const City = require("../models/cities");

const createCity = async (req, res) => {
  try {
    const { name, country } = req.body;

    // Check if the city already exists
    const existingCity = await City.findOne({ name });
    if (existingCity)
      return res.status(400).json({ message: "City already exists" });

    // Create new city
    const newCity = new City({ name, country });
    await newCity.save();

    res.status(201).json({ message: "City added successfully", city: newCity });
  } catch (error) {
    console.error("City creation error:", error); // Log error in console
    res
      .status(500)
      .json({ message: "Failed to add city", error: error.message });
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ cityId: 1 }); // Sort by ID
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities", error });
  }
};
const getCityById = async (req, res) => {
  try {
    const city = await City.findOne({ cityId: req.params.id });
    if (!city) return res.status(404).json({ message: "City not found" });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch city", error });
  }
};
const updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findOneAndUpdate(
      { cityId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCity)
      return res.status(404).json({ message: "City not found" });
    res.status(200).json({ message: "City updated successfully", updatedCity });
  } catch (error) {
    res.status(500).json({ message: "Failed to update city", error });
  }
};
const deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findOneAndDelete({ cityId: req.params.id });
    if (!deletedCity)
      return res.status(404).json({ message: "City not found" });
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete city", error });
  }
};
module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
