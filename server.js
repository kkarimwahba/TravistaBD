require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const connectDB = require("./connection"); // Import the connection function
const packagesRouter = require("./routes/apiRoutes"); // Adjust the path if needed
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

// Enable CORS for all origins (or configure specific origins)
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Enable cookies or authorization headers if needed
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", packagesRouter); // Prefix all routes with /api// Example route to test API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
