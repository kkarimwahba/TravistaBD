const mongoose = require("mongoose");

// Connection URL (replace with your own if using MongoDB Atlas)
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
