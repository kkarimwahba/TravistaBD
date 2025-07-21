// controllers/blogController.js
const Blog = require("../models/blogs");
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      slug: incomingSlug,
      contentTitle,
      content,
      category,
      tags,
      status,
      scheduledDate,
      seoKeywords,
      metaDescription, // <-- Add this
    } = req.body;
    // Use incoming slug or generate one from the title
    const slug = incomingSlug || slugify(title);
    const featuredImage = req.files?.featuredImage?.[0]?.filename || "";
    const embeddedImages = req.files?.embeddedImages?.[0]?.filename || "";
    // const embeddedImages =
    //   req.files?.embeddedImages?.map((f) => f.filename) || [];

    const blog = new Blog({
      title,
      subTitle,
      slug,
      contentTitle,
      content,
      featuredImage,
      embeddedImages,
      category,
      tags: tags ? tags.split(",") : [],
      status,
      scheduledDate,
      seoKeywords: seoKeywords ? seoKeywords.split(",") : [],
      metaDescription, // <-- Add this
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate("tags");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate("tags");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      slug,
      contentTitle,
      content,
      category,
      tags,
      status,
      scheduledDate,
      seoKeywords,
      metaDescription,
    } = req.body;

    const update = {
      title,
      subTitle,
      slug,
      contentTitle,
      content,
      category,
      tags: typeof tags === "string" ? tags.split(",") : tags || [],
      status,
      scheduledDate,
      seoKeywords:
        typeof seoKeywords === "string"
          ? seoKeywords.split(",")
          : seoKeywords || [],
      metaDescription,
      updatedAt: new Date(),
    };

    if (req.files?.featuredImage?.length) {
      update.featuredImage = req.files.featuredImage[0].filename;
    }

    if (req.files?.embeddedImages?.length) {
      update.embeddedImages = req.files.embeddedImages[0].filename;
    }

    const updatedPost = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
