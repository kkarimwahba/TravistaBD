const mongoose = require("mongoose");

// Connection URL (replace with your own if using MongoDB Atlas)
const mongoURI =
  "mongodb+srv://karimwahba63:iphone11K@cluster0.2fwrv.mongodb.net/travista?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
