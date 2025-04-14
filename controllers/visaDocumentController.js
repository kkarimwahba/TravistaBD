const Visa = require("../models/visaDocuments");

// Create
const createVisa = async (req, res) => {
  const { name, type } = req.body;
  const fileUrl = req.file?.path;

  try {
    const visa = new Visa({ name, type, fileUrl });
    await visa.save();
    res.status(201).json(visa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
const getAllVisas = async (req, res) => {
  try {
    const visas = await Visa.find();
    res.json(visas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updateVisa = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const fileUrl = req.file?.path;

  try {
    const visa = await Visa.findByIdAndUpdate(
      id,
      { name, type, ...(fileUrl && { fileUrl }) },
      { new: true }
    );
    res.json(visa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by id and return fileUrl
const getVisaFileUrlById = async (req, res) => {
  const { id } = req.params;
  try {
    const visa = await Visa.findById(id, "fileUrl");
    if (!visa) return res.status(404).json({ message: "Visa not found" });
    res.json({ fileUrl: visa.fileUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
const deleteVisa = async (req, res) => {
  const { id } = req.params;
  try {
    await Visa.findByIdAndDelete(id);
    res.json({ message: "Visa deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createVisa,
  getAllVisas,
  updateVisa,
  deleteVisa,
  getVisaFileUrlById,
};
