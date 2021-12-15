const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 8000;
// Important Handlers
const { getLanguage } = require("./AllHandlers/handlerLanguage");
const { HandlerPicture } = require("./AllHandlers/HandlerPicture");
const { getOccupation } = require("./AllHandlers/handleOccupation");
const { getReligion } = require("./AllHandlers/HandleReligion");
const { getHobbies } = require("./AllHandlers/HandleHobbies");

const {
  sendFriendRequest,
  confirmFriendRequest,
  getPendingFriendsList,
} = require("./AllHandlers/handleFriends");

const {
  getUsers,
  getUserById,
  addUserInfo,
  getNewUser,
  getUserByEmail,
} = require("./AllHandlers/handlers");

// const { upload } = require("./HandlerPicture");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

//API

//handle users
app.get("/api/users", getUsers);
app.get("/api/getUser/:id", getUserById);
app.get("/api/userEmail/:email", getUserByEmail);
app.get("/api/NewUser", getNewUser);
app.post("/api/addInfo/:email", addUserInfo);

//handle languages
app.get("/languages", getLanguage);
//handle Careers
app.get("/api/occupation", getOccupation);
//handle religion
app.get("/religion", getReligion);
//handle hobbies
app.get("/hobbies", getHobbies);
// handle pictures
app.post("/user/picture/:email", HandlerPicture);

//Handle friend request
app.put("/api/friends/add", sendFriendRequest);
app.put("/api/friends/confirm", confirmFriendRequest);
app.get("/api/friends/request", getPendingFriendsList);

// Home Page endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Home page" });
});

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
