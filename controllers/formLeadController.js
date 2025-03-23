const Form = require("../models/formsLeads");

// Create a new form entry
exports.createForm = async (req, res) => {
  try {
    const {
      type,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreedToTerms,
    } = req.body;

    if (!type || !["contactUs", "faq"].includes(type)) {
      return res.status(400).json({ error: "Invalid form type" });
    }

    const newForm = new Form({
      type,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreedToTerms,
    });
    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get forms by type (Contact Us or FAQ)
exports.getFormsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!["contactUs", "faq"].includes(type)) {
      return res.status(400).json({ error: "Invalid form type" });
    }

    const forms = await Form.find({ type });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms by type:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a form entry
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.status(200).json({ message: "Form entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting form entry:", error);
    res.status(500).json({ error: "Server error" });
  }
};
