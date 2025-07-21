// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../middleware/uploadBlogMiddleware");

router.post(
  "/",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "embeddedImages", maxCount: 1 },
  ]),
  blogController.createPost
);

router.get("/", blogController.getAllPosts);
router.get("/slug/:slug", blogController.getPostBySlug);
router.get("/:id", blogController.getPostById);

router.put(
  "/:id",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "embeddedImages", maxCount: 1 },
  ]),
  blogController.updatePost
);
router.delete("/:id", blogController.deletePost);

module.exports = router;
