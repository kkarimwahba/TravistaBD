import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Import the cors package
import connectDB from "./connection.js"; // Import the connection function
import packagesRouter from "./routes/apiRoutes.js"; // Adjust the path if needed
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import citiesRoutes from "./routes/citiesRoutes.js";
import visaLeadRoutes from "./routes/visaleadRoutes.js";
import seasonRoutes from "./routes/seasonRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import faqsRoutes from "./routes/faqsRoutes.js";
import SocialMedia from "./routes/socialMediaRoutes.js";
import formLeadRoutes from "./routes/formLeadRoutes.js";
import articlesRoutes from "./routes/articleRoutes.js";
import countriesRoutes from "./routes/countryRoutes.js";
import cookieParser from "cookie-parser";
import packagesRoutes from "./routes/packagesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Enable parsing cookies

// Enable CORS for all origins (or configure specific origins
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Enable cookies or authorization headers if needed
  })
);

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

// Example route to test API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
