const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 8000;

// Important Handlers
// const { getUsers } = require("./users");

const app = express();

// app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// Home Page endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Home page" });
});

// Endpoints for  Users
// app.get("/users, getUsers");

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
