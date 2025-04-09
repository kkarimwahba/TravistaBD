const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const upload = require("../middleware/multerSetup");

router.get("/", heroController.getAllHeroes);
router.get("/active", heroController.getActiveHero);
router.post("/", upload.single("image"), heroController.createHero);
router.patch("/activate/:id", heroController.activateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;
