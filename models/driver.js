const mongoose = require("mongoose");
// driver model

const DriverSchema = new mongoose.Schema({
  driverId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
