// controllers/tourController.js
const Tour = require("../models/tours");

exports.createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTour)
      return res.status(404).json({ message: "Tour not found" });
    res.json(updatedTour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour)
      return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
