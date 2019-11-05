const express = require("express");
const router = express.Router();
const { listLocations, submitLocation } = require("../../controllers/location-controller");

// list locations for an active session
router.get("/locations", listLocations);

// post loaction to an active session
router.post("/locations", submitLocation);

module.exports = router;