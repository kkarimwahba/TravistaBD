const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerSetup"); // Assuming you have a multer setup for file uploads
const {
  createBanner,
  getBanners,
  //   getBannerById,
  updateBanner,
  deleteBanner,
  toggleStatus,
  getActiveBanner,
} = require("../controllers/bannerController");

router.post("/", upload.single("image"), createBanner);
router.get("/", getBanners);
// router.get("/:id", getBannerById);
router.get("/active", getActiveBanner); // Get active banner
router.put("/:id", upload.single("image"), updateBanner);
router.delete("/:id", deleteBanner);
router.patch("/:id/status", toggleStatus); // Toggle active/inactive

module.exports = router;
