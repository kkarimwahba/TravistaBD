const express = require("express");
const {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  toggleFAQVisibility,
  getVisibleFAQs,
} = require("../controllers/faqsController");

const router = express.Router();

router.post("/", createFAQ); // Create a new FAQ
router.get("/", getAllFAQs); // Get all FAQs
router.get("/visible", getVisibleFAQs); // Get only visible FAQs for frontend
router.get("/:id", getFAQById); // Get a specific FAQ
router.put("/:id", updateFAQ); // Update an FAQ
router.delete("/:id", deleteFAQ); // Delete an FAQ
router.patch("/:id/toggle-visibility", toggleFAQVisibility); // Toggle FAQ visibility

module.exports = router;
