const SocialMedia = require("../models/socialMedia");

// Add a new social media link
const addSocialMedia = async (req, res) => {
  try {
    const { platform, url } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ message: "Platform and URL are required" });
    }

    // Check if a similar URL already exists in the database
    const existingLink = await SocialMedia.findOne({
      url: { $regex: new RegExp(url, "i") }, // Case-insensitive search
    });

    if (existingLink) {
      return res.status(400).json({
        message: "A similar social media link already exists in the database",
      });
    }

    // Check if the same platform already exists
    const existingPlatform = await SocialMedia.findOne({
      platform: { $regex: new RegExp(`^${platform}$`, "i") }, // Exact match but case-insensitive
    });

    if (existingPlatform) {
      return res.status(400).json({
        message: `A link for ${platform} already exists. Please update the existing link instead.`,
      });
    }

    const newSocial = new SocialMedia({ platform, url });
    await newSocial.save();

    res.status(201).json({
      message: "Social media link added successfully",
      social: newSocial,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getAllSocialMedia = async (req, res) => {
  try {
    const socialLinks = await SocialMedia.find().sort({ socialId: 1 });
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch social links", error });
  }
};
const updateSocialMedia = async (req, res) => {
  try {
    const { platform, url } = req.body;

    const updatedSocial = await SocialMedia.findOneAndUpdate(
      { socialId: req.params.id },
      { platform, url },
      { new: true }
    );

    if (!updatedSocial)
      return res.status(404).json({ message: "Social media link not found" });

    res.status(200).json({
      message: "Social media link updated successfully",
      social: updatedSocial,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteSocialMedia = async (req, res) => {
  try {
    const deletedSocial = await SocialMedia.findOneAndDelete({
      socialId: req.params.id,
    });

    if (!deletedSocial)
      return res.status(404).json({ message: "Social media link not found" });

    res.status(200).json({ message: "Social media link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  addSocialMedia,
  getAllSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
};
