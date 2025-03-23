const express = require("express");
const multer = require("multer");
const {
  createVisaApplication,
  getAllVisaApplications,
  getVisaApplicationById,
  getVisaApplicationsByUser,
  updateVisaApplication,
  deleteVisaApplication,
} = require("../controllers/visaleadController");

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CRUD routes
router.post("/", upload.single("bankStatement"), createVisaApplication);
router.get("/", getAllVisaApplications);
router.get("/:id", getVisaApplicationById);
router.get("/user/:userId", getVisaApplicationsByUser);
router.put("/:id", updateVisaApplication);
router.delete("/:id", deleteVisaApplication);

module.exports = router;
