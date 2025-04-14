const ApplyForPackage = require("../models/applyForPackage");

// Create new application
exports.createApplication = async (req, res) => {
  try {
    const application = new ApplyForPackage({
      ...req.body,
      packageId: req.params.packageId,
    });

    await application.save();
    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await ApplyForPackage.find().populate("packageId");
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get single application
exports.getApplication = async (req, res) => {
  try {
    const application = await ApplyForPackage.findById(req.params.id).populate(
      "packageId"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update application status
exports.updateApplication = async (req, res) => {
  try {
    const application = await ApplyForPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await ApplyForPackage.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
