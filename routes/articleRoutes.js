const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerSetup"); // Import multer
const articleController = require("../controllers/articleController");

// CRUD Routes
router.post(
  "/articles",
  upload.single("featuredImage"),
  articleController.createArticle
);
router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticleById);
router.put(
  "/articles/:id",
  upload.single("featuredImage"),
  articleController.updateArticle
);
router.delete("/articles/:id", articleController.deleteArticle);

module.exports = router;
