const FAQ = require("../models/faqs");

// Create a new FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer, subject } = req.body;

    if (!question || !answer || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFAQ = new FAQ({ question, answer, subject });
    await newFAQ.save();

    res.status(201).json({ message: "FAQ added successfully", faq: newFAQ });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ faqId: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs", error });
  }
};
const getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findOne({ faqId: req.params.id });

    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const updateFAQ = async (req, res) => {
  try {
    const { question, answer, subject } = req.body;

    const updatedFAQ = await FAQ.findOneAndUpdate(
      { faqId: req.params.id },
      { question, answer, subject },
      { new: true }
    );

    if (!updatedFAQ) return res.status(404).json({ message: "FAQ not found" });

    res
      .status(200)
      .json({ message: "FAQ updated successfully", faq: updatedFAQ });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteFAQ = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findOneAndDelete({ faqId: req.params.id });

    if (!deletedFAQ) return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle FAQ visibility
const toggleFAQVisibility = async (req, res) => {
  try {
    const faq = await FAQ.findOne({ faqId: req.params.id });

    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    faq.isVisible = !faq.isVisible;
    await faq.save();

    res.status(200).json({
      message: `FAQ visibility ${faq.isVisible ? "enabled" : "disabled"}`,
      faq,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all visible FAQs (for frontend)
const getVisibleFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isVisible: true }).sort({ faqId: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch visible FAQs", error });
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  toggleFAQVisibility,
  getVisibleFAQs,
};
