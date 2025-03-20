const express = require("express");
const router = express.Router();
const { listPackages } = require("../controllers/packagesController");

// Route to get the packages
router.get("/packages", listPackages);
router.post("/packages", listPackages); // Use POST if that's the expected method

module.exports = router;
