const express = require("express");
const {
  addSocialMedia,
  getAllSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../controllers/socialMediaController");

const router = express.Router();

router.post("/", addSocialMedia); // Create new social media link
router.get("/", getAllSocialMedia); // Get all social media links
router.put("/:id", updateSocialMedia); // Update social media link
router.delete("/:id", deleteSocialMedia); // Delete social media link

module.exports = router;
