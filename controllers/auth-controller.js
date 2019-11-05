const Driver = require("../models/driver");
const Session = require("../models/session");
const { registerSchema, uuidSchema } = require('../utils/validation');

exports.register = (req, res) => {
  const { driverId, firstName, lastName } = req.body;

  // basic validation
  const result = registerSchema.validate({ uuid: driverId, firstName, lastName });
  if (!result.error) {

  // check if driver exists
  Driver.findOne({ driverId: driverId }).then((driver) => {
    if (driver) return res.status(422).json({ msg: "Driver already exists" });

    // create new driver
    const newDriver = new Driver({
      driverId,
      firstName,
      lastName
    });

    // save new driver
    newDriver
      .save()
      .then(
        res.json({
          msg: "Successfully Registered"
        })
      )
      .catch((err) => console.log(err));
  });
  } else {
    res.status(400).json(result.error.details[0].message);
  }

};

exports.login = (req, res) => {
  const { driverId } = req.body;

  // basic validation
  const result = uuidSchema.validate({ uuid: driverId });
  if (!result.error) {
  
  // check if driver exists
  Driver.findOne({ driverId }).then((driver) => {
    if (!driver) return res.status(422).json({ msg: "Driver not found" });

    const isActive = true;

    req.session.isActive = isActive;
    req.session.driverId = driverId;

    // check if active session already exists
    Session.findOne({ driverId, isActive }).then((session) => {
      if (session) return res.status(200).json({ msg: 'Logged in successfully' });
      // create new session
      const newSession = new Session({
        driverId,
        isActive,
      });

      newSession
        .save()
        .then(
          res.json({ msg: "Logged in successfully" })
        )
        .catch((err) => console.log(err));
    });
  });
  } else {
    res.status(400).json(result.error.details[0].message);
  }
};

exports.logout = (req, res) => {
  const driverId = req.session.driverId;
  Session.updateOne(
    { driverId: driverId, isActive: true },
    {
      $set: { isActive: false }
    }
  ).then(() => {
    req.session.isActive = false;
    res.clearCookie("session-id");
    res.send({ msg: "Logged out successfully" });
  })
    .catch((err) => res.status(500).json(err));;
}