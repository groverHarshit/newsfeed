var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
require("dotenv").config();

// DB
require("./config");
require("./initialisers/initialiser");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const config = require("config");

app.use(
  session({
    name: "aajtak-session",
    store: MongoStore.create({
      mongoUrl: config.get("DB_URL"),
    }),
    cookie: {
      maxAge: 3600000,
      sameSite: true,
      secure: false,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    secret: "aajtak-session-JQEUNJASNDD!@#%!@#",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/feeds", indexRouter);
app.use("/users", usersRouter);

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
