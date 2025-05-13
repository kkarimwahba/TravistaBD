// controllers/buildPackageController.js

const BuildPackage = require("../models/buildPackage");

// CREATE
exports.createPackageRequest = async (req, res) => {
  try {
    const newRequest = new BuildPackage(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ (for admin panel)
exports.getAllPackageRequests = async (req, res) => {
  try {
    const requests = await BuildPackage.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ (single request)
exports.getPackageRequestById = async (req, res) => {
  try {
    const request = await BuildPackage.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE
exports.updatePackageRequest = async (req, res) => {
  try {
    const updatedRequest = await BuildPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deletePackageRequest = async (req, res) => {
  try {
    const deleted = await BuildPackage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
