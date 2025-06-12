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

const fileFilter = (req, file, cb) => {
  // Accept any kind of file and image
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  cb(null, false);
};

const upload = multer({ storage, fileFilter });

// CRUD routes
router.post("/", upload.array("additionalFiles", 10), createVisaApplication);
router.get("/", getAllVisaApplications);
router.get("/:id", getVisaApplicationById);
router.get("/user/:userId", getVisaApplicationsByUser);
router.put("/:id", updateVisaApplication);
router.delete("/:id", deleteVisaApplication);

module.exports = router;
