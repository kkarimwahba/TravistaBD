// routes/comments.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Admin routes
router.get("/admin", commentController.getAllComments);
router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);
router.patch("/:id/toggle-visibility", commentController.toggleVisibility);

// Public route
router.get("/", commentController.getVisibleComments);

module.exports = router;
