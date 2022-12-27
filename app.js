var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var database = require('./database');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var restaurantsRouter = require("./routes/restaurants");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/restaurants", restaurantsRouter);

const mongoClient = require("mongodb").MongoClient;
const dbName = "test";
const dbUrl = "mongodb://127.0.0.1:27017/";

// mongoClient.connect(dbUrl, (err, mongo) => {
//   if (err) {
//     console.log('Error in connecting to DB ' + err);
//   }
//   else {
//     console.log('Connection established');
//     const db = mongo.db(dbName);
//     db.collection('restaurants').find().toArray((err, result) => {
//       console.log(result);
//     })
//   }
// })


database.connectToDatabase()
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("Error in connecting to DB " + err);
  });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
