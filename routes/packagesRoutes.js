const express = require("express");
const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  togglePackageStatus,
} = require("../controllers/packagesController");
const upload = require("../middleware/multerSetup");

const router = express.Router();

// Create a new package
router.post(
  "/",
  upload.fields([
    { name: "packagePicture", maxCount: 1 },
    { name: "pdfDocument", maxCount: 1 },
  ]),
  createPackage
);
// Get all packages
router.get("/", getPackages);

// Get a single package by ID
router.get("/:id", getPackageById);

// Update a package
router.put("/:id", upload.single("packagePicture"), updatePackage);
// Delete a package
router.delete("/:id", deletePackage);
router.patch("/toggle-status/:id", togglePackageStatus);

module.exports = router;
