const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  travistaID: {
    type: String,
    index: false,
  },
  packagePicture: {
    type: String,
  },
  departureDate: {
    type: Date,
  },
  destinations: [
    {
      type: String,
    },
  ],
  totalDays: {
    type: Number,
  },
  totalNights: {
    type: Number,
  },
  generalNotes: [
    {
      type: String,
    },
  ],
  packagePrice: {
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
  },
  flights: [
    {
      airline: {
        type: String,
      },
      date: {
        type: Date,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
      departureDate: {
        type: Date,
      },
      departureTime: {
        type: String,
      },
      arrivalDate: {
        type: Date,
      },
      arrivalTime: {
        type: String,
      },
    },
  ],
  hotels: [
    {
      city: {
        type: String,
      },
      nights: {
        type: Number,
      },
      hotelName: {
        type: String,
      },
      single: {
        type: Number,
      },
      double: {
        type: Number,
      },
      triple: {
        type: Number,
      },
    },
  ],
  includes: [
    {
      type: String,
    },
  ],
  excludes: [
    {
      type: String,
    },
  ],
  pdfDocument: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Remove any existing indexes
packageSchema.indexes().forEach((index) => {
  packageSchema.index(index, { unique: false });
});

module.exports = mongoose.model("Package", packageSchema);
