// controllers/packagesController.js
const Package = require("../models/packages");

// Create a new package
const createPackage = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.packageData);

    const {
      packageName,
      travistaID,
      departureDate,
      destinations,
      totalDays,
      totalNights,
      generalNotes,
      packagePrice,
      flights,
      hotels,
      includes,
      excludes,
      isActive,
      tour,
    } = parsedData;

    const packagePicture = req.files?.packagePicture?.[0]?.path || null;
    const pdfDocument = req.files?.pdfDocument?.[0]?.path || null;

    const newPackage = new Package({
      packageName,
      travistaID,
      departureDate,
      destinations,
      totalDays,
      totalNights,
      generalNotes,
      packagePrice,
      flights,
      hotels,
      includes,
      excludes,
      packagePicture,
      pdfDocument,
      isActive: typeof isActive === "boolean" ? isActive : true, // default to true
      tour: tour || null,
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all packages
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single package by ID
const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a package
const updatePackage = async (req, res) => {
  try {
    let packageData;

    // Check if packageData is coming as JSON string in FormData
    if (req.body.packageData) {
      packageData = JSON.parse(req.body.packageData);
    } else {
      packageData = req.body;
    }

    // Handle file uploads if they exist
    if (req.file) {
      packageData.packagePicture = req.file.path; // or your file handling logic
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      {
        ...packageData,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Toggle package active status
const togglePackageStatus = async (req, res) => {
  try {
    const packageId = req.params.id;

    const foundPackage = await Package.findById(packageId);
    if (!foundPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    foundPackage.isActive = !foundPackage.isActive;
    foundPackage.updatedAt = Date.now();

    const updatedPackage = await foundPackage.save();

    res.status(200).json({
      message: `Package is now ${
        updatedPackage.isActive ? "active" : "inactive"
      }`,
      package: updatedPackage,
    });
  } catch (error) {
    console.error("Error toggling package status:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  togglePackageStatus,
};
