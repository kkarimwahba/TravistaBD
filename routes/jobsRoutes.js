const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");

router.post("/", jobsController.createJob);
router.get("/", jobsController.getJobs);
router.get("/:id", jobsController.getJobById);
router.put("/:id", jobsController.updateJob);
router.delete("/:id", jobsController.deleteJob);
router.patch("/:id/toggle-visibility", jobsController.toggleJobVisibility);

module.exports = router;
