require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./connection");

// App and Port

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Your session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Your MongoDB URI
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true for HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiration time (1 day)
    },
  })
);

// All routes
const packagesRouter = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const citiesRoutes = require("./routes/citiesRoutes");
const visaLeadRoutes = require("./routes/visaleadRoutes");
const seasonRoutes = require("./routes/seasonRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const faqsRoutes = require("./routes/faqsRoutes");
const SocialMedia = require("./routes/socialMediaRoutes");
const formLeadRoutes = require("./routes/formLeadRoutes");
const articlesRoutes = require("./routes/articleRoutes");
const countriesRoutes = require("./routes/countryRoutes");
const heroRoutes = require("./routes/heroRoutes");
const tagRoutes = require("./routes/tagRoutes");
const blogRoutes = require("./routes/blogRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const commentRoutes = require("./routes/commentRoutes");
const empAuthRoutes = require("./routes/empAuthRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const packagesRoutes = require("./routes/packagesRoutes");
const toursRoutes = require("./routes/ToursRoutes");
const tourCategoryRoutes = require("./routes/tourCategoryRoutes");
const applyForPackageRoutes = require("./routes/applyForPackageRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/seasons", seasonRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/social-media", SocialMedia);
app.use("/api/form-lead", formLeadRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/packages", packagesRoutes); // Add the packages routes
app.use("/api/visa-leads", visaLeadRoutes);
app.use("/api/empauth", empAuthRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tours", toursRoutes);
app.use("/api/tour-categories", tourCategoryRoutes);
app.use("/api/applications", applyForPackageRoutes);

app.use("/api", packagesRouter);
app.use("/api/visa-leads", visaLeadRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
