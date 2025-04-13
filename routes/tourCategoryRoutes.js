const express = require("express");
const router = express.Router();
const tourCategoryController = require("../controllers/tourCategoryController");

router.post("/", tourCategoryController.createCategory);
router.get("/", tourCategoryController.getAllCategories);
router.get("/:id", tourCategoryController.getCategoryById);
router.put("/:id", tourCategoryController.updateCategory);
router.delete("/:id", tourCategoryController.deleteCategory);

module.exports = router;
