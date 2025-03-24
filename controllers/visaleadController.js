const VisaLead = require("../models/visalead");

// Create a new visa application
exports.createVisaApplication = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      phoneNumber,
      country,
      purpose,
      invitation,
      schengenBefore,
      travelDate,
      jobStatus,
      bankStatement,
      visaRenewal,
      agreedToTerms,
    } = req.body;

    const userIdToUse = userId ? userId : null;

    const newApplication = new VisaLead({
      userId: userIdToUse,
      firstName,
      lastName,
      phoneNumber,
      country,
      purpose,
      invitation,
      schengenBefore,
      travelDate,
      jobStatus,
      visaRenewal,
      bankStatement,
      agreedToTerms,
    });

    await newApplication.save();
    res.status(201).json({
      message: "Visa application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error });
  }
};

// Get all visa applications
exports.getAllVisaApplications = async (req, res) => {
  try {
    const applications = await VisaLead.find().populate("userId", "name email");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Get a single visa application by ID
exports.getVisaApplicationById = async (req, res) => {
  try {
    const application = await VisaLead.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error });
  }
};

// Get visa applications by user ID
exports.getVisaApplicationsByUser = async (req, res) => {
  try {
    const applications = await VisaLead.find({
      userId: req.params.userId,
    }).populate("userId", "name email");

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications found for this user" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Update a visa application
exports.updateVisaApplication = async (req, res) => {
  try {
    const updatedApplication = await VisaLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedApplication)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json({
      message: "Application updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error });
  }
};

// Delete a visa application
exports.deleteVisaApplication = async (req, res) => {
  try {
    const deletedApplication = await VisaLead.findByIdAndDelete(req.params.id);

    if (!deletedApplication)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error });
  }
};
