const express = require("express");
const router = express.Router();
const buildPackageController = require("../controllers/buildPackageController");

// CREATE - User submits package request
router.post("/", buildPackageController.createPackageRequest);

// READ - Admin fetches all requests
router.get("/", buildPackageController.getAllPackageRequests);

// READ - Admin views single request
router.get("/:id", buildPackageController.getPackageRequestById);

// UPDATE - Admin updates a request
router.put("/:id", buildPackageController.updatePackageRequest);

// DELETE - Admin deletes a request
router.delete("/:id", buildPackageController.deletePackageRequest);

module.exports = router;
