const Banner = require("../models/banner");
const fs = require("fs");
const path = require("path");

exports.createBanner = async (req, res) => {
  try {
    const { title, destinations, description, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const banner = new Banner({
      title,
      destinations,
      description,
      image,
      date,
    });
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBanners = async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    // Handle invalid ObjectId errors
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid banner ID" });
    }
    res.status(500).json({ error: "Failed to fetch banner" });
  }
};

exports.updateBanner = async (req, res) => {
  const { title, destinations, description, date } = req.body;
  const banner = await Banner.findById(req.params.id);
  if (!banner) return res.status(404).json({ error: "Not found" });

  if (req.file && banner.image) {
    fs.unlinkSync(path.resolve(banner.image));
  }

  banner.title = title || banner.title;
  banner.destinations = destinations || banner.destinations;
  banner.description = description || banner.description;
  banner.date = date || banner.date;
  if (req.file)
    banner.image = req.file ? `/uploads/${req.file.filename}` : banner.image;

  await banner.save();
  res.json(banner);
};

exports.deleteBanner = async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  if (!banner) return res.status(404).json({ error: "Not found" });

  if (banner.image) {
    fs.unlinkSync(path.resolve(banner.image));
  }

  res.json({ message: "Banner deleted" });
};

exports.toggleStatus = async (req, res) => {
  try {
    // Find the banner by ID
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    // If the banner is being set as active, deactivate all other banners first
    if (banner.isActive === false) {
      // Set all banners to inactive
      await Banner.updateMany({}, { isActive: false });

      // Then set the selected banner to active
      banner.isActive = true;
    } else {
      // If the banner is already active, set it to inactive
      banner.isActive = false;
    }

    // Save the updated banner
    await banner.save();

    res.json({ status: banner.isActive });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while toggling banner status" });
  }
};

exports.getActiveBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active banner" });
  }
};
