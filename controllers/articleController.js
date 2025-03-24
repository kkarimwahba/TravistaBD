const Article = require("../models/articles");

// ✅ Create an article
exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      category,
      status,
      scheduledDate,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newArticle = new Article({
      title,
      content,
      featuredImage,
      tags: tags ? tags.split(",") : [],
      category,
      status,
      scheduledDate: status === "Scheduled" ? new Date(scheduledDate) : null,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
    });

    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully", newArticle });
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error });
  }
};

// ✅ Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

// ✅ Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

// ✅ Update an article
exports.updateArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      category,
      status,
      scheduledDate,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    const updateFields = {
      title,
      content,
      category,
      status,
      scheduledDate: status === "Scheduled" ? new Date(scheduledDate) : null,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      tags: tags ? tags.split(",") : [],
    };

    if (req.file) {
      updateFields.featuredImage = `/uploads/${req.file.filename}`;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedArticle)
      return res.status(404).json({ message: "Article not found" });

    res
      .status(200)
      .json({ message: "Article updated successfully", updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error });
  }
};

// ✅ Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle)
      return res.status(404).json({ message: "Article not found" });

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error });
  }
};
