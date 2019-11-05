const mongoose = require("mongoose");
// location model

const LocationSchema = new mongoose.Schema({
  location: {
    type: { type: String },
    coordinates: [],
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// LocationSchema.index({ location: "2dsphere" });

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
