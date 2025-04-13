const express = require("express");
const router = express.Router();
const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packagesController");

// Route to get all packages
router.get("/packages", getPackages);

// Route to create a new package
router.post("/packages", createPackage);

// Route to get a single package
router.get("/packages/:id", getPackageById);

// Route to update a package
router.put("/packages/:id", updatePackage);

// Route to delete a package
router.delete("/packages/:id", deletePackage);

module.exports = router;
