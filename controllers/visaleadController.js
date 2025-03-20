const VisaLead = require("../models/visalead");

// Create a new visa lead
exports.createVisaLead = async (req, res) => {
  try {
    const {
      userId,
      country,
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      agreedToTerms,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newLead = new VisaLead({
      userId,
      country,
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      agreedToTerms,
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all visa leads
exports.getVisaLeads = async (req, res) => {
  try {
    const leads = await VisaLead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVisaLeadsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const leads = await VisaLead.find({ userId });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single visa lead by ID
exports.getVisaLeadById = async (req, res) => {
  try {
    const lead = await VisaLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a visa lead
exports.updateVisaLead = async (req, res) => {
  try {
    const updatedLead = await VisaLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLead)
      return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a visa lead
exports.deleteVisaLead = async (req, res) => {
  try {
    const deletedLead = await VisaLead.findByIdAndDelete(req.params.id);
    if (!deletedLead)
      return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
