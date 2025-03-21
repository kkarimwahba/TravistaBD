const Season = require("../models/seasons");

// Create a new season
const createSeason = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    // Check if season already exists
    const existingSeason = await Season.findOne({ name });
    if (existingSeason)
      return res.status(400).json({ message: "Season already exists" });

    const newSeason = new Season({ name, startDate, endDate });
    await newSeason.save();

    res
      .status(201)
      .json({ message: "Season added successfully", season: newSeason });
  } catch (error) {
    res.status(500).json({ message: "Failed to add season", error });
  }
};
const getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find().sort({ seasonId: 1 }); // Sort by ID
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seasons", error });
  }
};
const getSeasonById = async (req, res) => {
  try {
    const season = await Season.findOne({ seasonId: req.params.id });
    if (!season) return res.status(404).json({ message: "Season not found" });
    res.status(200).json(season);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch season", error });
  }
};
const updateSeason = async (req, res) => {
  try {
    const updatedSeason = await Season.findOneAndUpdate(
      { seasonId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedSeason)
      return res.status(404).json({ message: "Season not found" });
    res
      .status(200)
      .json({ message: "Season updated successfully", updatedSeason });
  } catch (error) {
    res.status(500).json({ message: "Failed to update season", error });
  }
};
const deleteSeason = async (req, res) => {
  try {
    const deletedSeason = await Season.findOneAndDelete({
      seasonId: req.params.id,
    });
    if (!deletedSeason)
      return res.status(404).json({ message: "Season not found" });
    res.status(200).json({ message: "Season deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete season", error });
  }
};

module.exports = {
  createSeason,
  getAllSeasons,
  getSeasonById,
  updateSeason,
  deleteSeason,
};
