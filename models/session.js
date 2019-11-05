const mongoose = require("mongoose");
// session model

const SessionSchema = new mongoose.Schema({
    driverId: {
        type: String,
        required: true
    },
    locations: {
        type: Array,
        required: false
    },
    isActive: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
