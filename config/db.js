const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = require("./config");

module.exports = {
  MongoURI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-cuo2x.mongodb.net/${DB_CLUSTER}?retryWrites=true&w=majority`
};

