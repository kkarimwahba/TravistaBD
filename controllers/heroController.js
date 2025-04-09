const Hero = require("../models/hero");
const path = require("path");

// POST with file upload
exports.createHero = async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const hero = new Hero({
      caption,
      imageUrl,
      isActive: false,
    });

    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    console.error("Error creating hero:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// GET all heroes
exports.getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
};

// GET active hero
exports.getActiveHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({ isActive: true });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active hero" });
  }
};

// PATCH activate an existing hero
exports.activateHero = async (req, res) => {
  const { id } = req.params;

  try {
    // First, check if the hero exists
    const hero = await Hero.findById(id);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    // Deactivate all heroes before activating the selected one
    await Hero.updateMany({}, { isActive: false });

    // Update the selected hero to be active
    const updatedHero = await Hero.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!updatedHero) {
      return res.status(500).json({ error: "Failed to activate hero" });
    }

    res.json(updatedHero);
  } catch (err) {
    console.error("Error activating hero:", err.message);
    res
      .status(500)
      .json({ error: "Failed to activate hero", details: err.message });
  }
};

// DELETE hero
exports.deleteHero = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Hero deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete hero" });
  }
};
