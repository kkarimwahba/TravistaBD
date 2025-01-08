const express = require("express");
const router = express.Router();
const { listPackages } = require("../controllers/packagesController");

// Define routes
router.get("/packages", listPackages); // Example route to get all packages

module.exports = router;
