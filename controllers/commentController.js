// controllers/commentController.js
const Comment = require("../models/comments");

// Get all comments (for admin)
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get visible comments (for home page)
exports.getVisibleComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isShow: true }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new comment
exports.createComment = async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.body.author,
    memberSince: req.body.memberSince,
    isShow: req.body.isShow || false,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (req.body.content != null) comment.content = req.body.content;
    if (req.body.author != null) comment.author = req.body.author;
    if (req.body.memberSince != null)
      comment.memberSince = req.body.memberSince;
    if (req.body.isShow != null) comment.isShow = req.body.isShow;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle comment visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.isShow = !comment.isShow;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
