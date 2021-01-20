require("../models/User");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// use node's global promises
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
