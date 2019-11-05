const Driver = require("../models/driver");
const Session = require("../models/session");
const { uuidSchema } = require('../utils/validation');


exports.listDriverById = (req, res) => {
  const driverId = req.params.id;
  // request validation
  const result = uuidSchema.validate({ uuid: driverId });
  if (!result.error) {
    // find driver by id
    Driver.findOne({ driverId }).then((driver) => {
      res.json(driver)
    });
  } else {
    res.status(400).json(result.error.details[0].message);
  }

};

exports.listDriverSessions = (req, res) => {
  const driverId = req.params.id;
  // option to search active sessions
  const isActive = req.query.isActive || false;
  // request validation
  const result = uuidSchema.validate({ uuid: driverId });
  if (!result.error) {
    // find driver sessions
    Session.find({ driverId, isActive: isActive }).then((sessions) => {
      res.json(sessions)
    });
  } else {
    res.status(400).json(result.error.details[0].message);
  }
}


exports.listDrivers = (req, res) => {
  const firstName = req.query.firstName;
  // add possible query parameter
  const query = firstName ? { firstName } : {};
  // query all drivers 
  Driver.find(query).then((drivers) => {
    res.json(drivers);
  });
};