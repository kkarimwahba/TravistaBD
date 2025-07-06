const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// File filter (Only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "image/webp", // Add more if needed
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .doc
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// Upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB file limit
  fileFilter,
});

module.exports = upload;
