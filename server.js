const express = require("express");
const app = express();
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require('helmet');

// constants
const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV
} = require("./config/config");
const { MongoURI } = require("./config/db");

// connect to database
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// express body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set up mporgan
if(NODE_ENV !== 'test') {
  // only use morgan in dev environment
  app.use(morgan('dev')); 
}

// set up express session
app.use(
  session({
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// set up helmet
app.use(helmet())

// endpoints / routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/drivers", require("./routes/api/drivers"));
app.use("/api/session", require("./routes/api/session"));


if(NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));
}

module.exports = app;
