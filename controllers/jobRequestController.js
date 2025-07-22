const JobRequest = require("../models/jobRequest");
const Notification = require("../models/notification");

// Create a new job request
exports.createJobRequest = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobRequest = new JobRequest({ ...req.body, job: jobId });
    await jobRequest.save();
    const notification = new Notification({
      type: "Job Application",
      description: `New job application from ${jobRequest.fullName} (${
        jobRequest.email
      }) for job: ${req.body.job || "N/A"}.`,
    });
    await notification.save();
    res.status(201).json(jobRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all job requests
exports.getJobRequests = async (req, res) => {
  try {
    const jobRequests = await JobRequest.find().populate("job");
    res.json(jobRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job request by ID
exports.getJobRequestById = async (req, res) => {
  try {
    const jobRequest = await JobRequest.findById(req.params.id).populate("job");
    if (!jobRequest)
      return res.status(404).json({ error: "Job request not found" });
    res.json(jobRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job request
exports.updateJobRequest = async (req, res) => {
  try {
    const jobRequest = await JobRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!jobRequest)
      return res.status(404).json({ error: "Job request not found" });
    res.json(jobRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a job request
exports.deleteJobRequest = async (req, res) => {
  try {
    const jobRequest = await JobRequest.findByIdAndDelete(req.params.id);
    if (!jobRequest)
      return res.status(404).json({ error: "Job request not found" });
    res.json({ message: "Job request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
