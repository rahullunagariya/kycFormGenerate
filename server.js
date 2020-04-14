const express = require("express");
const app = express();
var cors = require("cors");
require("express-async-errors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
var con = mongoose.connection;

// Database Connection
require("./model/connectdb.model.js");

app.use(cors());
app.use(express.static(path.join(__dirname, "client/src/assets/userfiles")));
app.use(express.static(path.join(__dirname, "client/src/assets/userimages")));
app.use(express.static(path.join(__dirname, "uploads")));

//app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()).use(logger("combined"));

//Models
require("./model/kyc.model");

//Routes
app.use("/kyc", require("./routes/kyc.route.js"));

//Generate error for not found routes
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not Found");

  next(error);
});

//error handlar

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message,
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(3002, function () {
  console.log("Server is running on 3002 port number");
});
