const express = require("express");
const {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/applyForPackageController");

const router = express.Router();

router.post("/:packageId", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
