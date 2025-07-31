const City = require("../models/cities");
const Country = require("../models/country");

// 📌 Create a New City
const createCity = async (req, res) => {
  try {
    const { name, country } = req.body;

    // Check if country exists
    const existingCountry = await Country.findById(country);
    if (!existingCountry)
      return res.status(404).json({ message: "Country not found" });

    // Check if the city already exists
    const existingCity = await City.findOne({ name });
    if (existingCity)
      return res.status(400).json({ message: "City already exists" });

    // Create new city
    const newCity = new City({ name, country });
    await newCity.save();

    res.status(201).json({ message: "City added successfully", city: newCity });
  } catch (error) {
    console.error("City creation error:", error);
    res
      .status(500)
      .json({ message: "Failed to add city", error: error.message });
  }
};

// 📌 Get All Cities (Populated with Country Info)
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate("country", "name code"); // Populate with name & code

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities", error });
  }
};

// 📌 Get Single City by ID (Populated with Country Info)
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate(
      "country",
      "name code"
    );
    if (!city) return res.status(404).json({ message: "City not found" });

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch city", error });
  }
};

// 📌 Update City (Ensure Country Exists)
const updateCity = async (req, res) => {
  try {
    const { name, country } = req.body;

    if (country) {
      const existingCountry = await Country.findById(country);
      if (!existingCountry)
        return res.status(404).json({ message: "Country not found" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (country) updateData.country = country;

    const updatedCity = await City.findByIdAndUpdate(
      req.params.id, // Use the MongoDB _id directly
      updateData,
      { new: true, runValidators: true }
    ).populate("country", "name code");

    if (!updatedCity)
      return res.status(404).json({ message: "City not found" });

    res.status(200).json({ message: "City updated successfully", updatedCity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update city", error });
  }
};

// 📌 Delete City
const deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity)
      return res.status(404).json({ message: "City not found" });

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete city", error });
  }
};

// 📌 Get Cities by Country ID
const getCitiesByCountry = async (req, res) => {
  try {
    const { countryId } = req.params;

    // Find all cities that match the given country ID
    const cities = await City.find({ country: countryId }).populate(
      "country",
      "name code"
    );

    if (!cities.length) {
      return res
        .status(404)
        .json({ message: "No cities found for this country" });
    }

    res.status(200).json(cities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch cities by country", error });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getCitiesByCountry,
};
