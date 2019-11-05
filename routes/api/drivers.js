const express = require("express");
const router = express.Router();
const { listDrivers, listDriverById, listDriverSessions } = require("../../controllers/driver-controller");

// list all drivers
router.get("/", listDrivers);

// list driver by id
router.get("/:id", listDriverById);

// list sessions for specific driver
router.get("/:id/sessions", listDriverSessions);

module.exports = router;