const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../../controllers/auth-controller");

// registers a new driver
router.post("/register", register);

// logs in a driver, creates an active session
router.post("/login", login);

// logs out driver, session is turned inactive
router.post("/logout", logout);

module.exports = router;