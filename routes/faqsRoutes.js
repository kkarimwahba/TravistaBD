const express = require("express");
const {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqsController");

const router = express.Router();

router.post("/", createFAQ); // Create a new FAQ
router.get("/", getAllFAQs); // Get all FAQs
router.get("/:id", getFAQById); // Get a specific FAQ
router.put("/:id", updateFAQ); // Update an FAQ
router.delete("/:id", deleteFAQ); // Delete an FAQ

module.exports = router;
