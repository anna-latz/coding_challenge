const Location = require("../models/location");
const Session = require("../models/session");

const { locationSchema } = require('../utils/validation');

exports.listLocations = (req, res) => {
  const driverId = req.session.driverId;
  const isActive = req.session.isActive;
  // check if session is active
  if(!isActive) return res.status(401).json({ msg: "Inactive session - Please log in" });
  // find locations for active session
  Session.findOne({driverId, isActive}).then((session) => {
    locations = session.locations;
    res.json(locations);
  });
};

exports.submitLocation = (req, res) => {
  const driverId = req.session.driverId;
  const isActive = req.session.isActive;
 // check if session is active
  if(!isActive) return res.status(401).json({ msg: "Inactive Session - Please log in" });

  const { longitude, latitude } = req.body;
  // request validation
  const result = locationSchema.validate({ longitude, latitude });

  if (!result.error) { 
    // create new location
    const newLocation = new Location({
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
    });
    // add location to active session
    Session.updateOne(
      { driverId, isActive },
      {
        $push: { locations: newLocation }
      }
    ).then(() => {
      res.send({ msg: "Location submitted successfully"});
    });
  } else {
    res.status(400).json(result.error.details[0].message);
  }
};
