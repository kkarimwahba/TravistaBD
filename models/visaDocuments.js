const mongoose = require("mongoose");

const visaDocumentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VisaDocuments", visaDocumentsSchema);
