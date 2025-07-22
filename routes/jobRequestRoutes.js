const express = require("express");
const router = express.Router();
const jobRequestController = require("../controllers/jobRequestController");

router.post("/:jobId", jobRequestController.createJobRequest);
router.get("/", jobRequestController.getJobRequests);
router.get("/:id", jobRequestController.getJobRequestById);
router.put("/:id", jobRequestController.updateJobRequest);
router.delete("/:id", jobRequestController.deleteJobRequest);

module.exports = router;
