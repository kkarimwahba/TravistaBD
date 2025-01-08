const Package = require("../models/packages");

// Controller for listing packages
const listPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages", error });
  }
};

module.exports = {
  listPackages,
};
