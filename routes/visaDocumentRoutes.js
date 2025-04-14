const express = require("express");
const {
  createVisa,
  getAllVisas,
  updateVisa,
  getVisaFileUrlById,
  deleteVisa,
} = require("../controllers/visaDocumentController");

const router = express.Router();
const upload = require("../middleware/multerSetup");

router.get("/", getAllVisas);
router.get("/:id", getVisaFileUrlById);
router.post("/", upload.single("file"), createVisa);
router.put("/:id", upload.single("file"), updateVisa);
router.delete("/:id", deleteVisa);

module.exports = router;
