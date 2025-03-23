const Country = require("../models/country");

// 📌 Get All Countries
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get Single Country by ID
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Add New Country
const addCountry = async (req, res) => {
  try {
    const { name, code } = req.body;
    const newCountry = new Country({ name, code });
    await newCountry.save();
    res.status(201).json({ message: "Country added successfully", newCountry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Update Country
const updateCountry = async (req, res) => {
  try {
    const { name, code } = req.body;
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      { name, code },
      { new: true }
    );
    if (!updatedCountry)
      return res.status(404).json({ message: "Country not found" });
    res.status(200).json({ message: "Country updated", updatedCountry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Delete Country
const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(req.params.id);
    if (!deletedCountry)
      return res.status(404).json({ message: "Country not found" });
    res.status(200).json({ message: "Country deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry,
};
