const mongoose = require("mongoose");
require("dotenv").config();
const mongoDBErros = require("mongoose-mongodb-errors");
mongoose.plugin(mongoDBErros);
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
