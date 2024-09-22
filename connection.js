const mongoose = require('mongoose');

// Connection URL (replace with your own if using MongoDB Atlas)
const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
