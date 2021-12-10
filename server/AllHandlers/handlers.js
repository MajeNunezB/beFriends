require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const { v4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

///////////////////////////////
// Function to Get all users //
//////////////////////////////
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");
    const users = await db.collection("users").find({}).toArray();

    res.status(200).json({ status: 200, message: "Success!", data: users });

    client.close();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all users 😭",
    });
  }
};

////////////////////////////////////////
// Function to get a user by _id      //
///////////////////////////////////////

const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  try {
    await client.connect();

    const db = client.db("beFriends");
    let user = await db.collection("users").findOne({ _id: id });

    res.status(200).json({ status: 200, message: "User found", data: user });

    client.close();
  } catch (error) {
    console.info(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all users 😭",
    });
  }
};

////////////////////////////////////////
// Function to get a user by email     //
///////////////////////////////////////

const getUserByEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email } = req.params;

  try {
    await client.connect();

    const db = client.db("beFriends");
    let user = await db.collection("users").findOne({ email: email });

    res.status(200).json({ status: 200, message: "User found", data: user });

    client.close();
  } catch (error) {
    console.info(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all users 😭",
    });
  }
};

// ///////////////////////////////////////////////////
//             Function to new user              //
// //////////////////////////////////////////////////

const getNewUser = async (req, res) => {
  const { email, name, city, age, address, occupation, bio, picture } =
    req.body; // how to add a new picture from outside

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");
    //to verify that all the fields are added

    if (
      !email ||
      !name ||
      !city ||
      !age ||
      !address ||
      !occupation ||
      !picture ||
      !bio
    ) {
      return res
        .status(404)
        .json({ status: 404, message: "please add all the fields " });
    } else if (name.length <= 2) {
      return res.status(400).json({ status: 400, message: "Name too short" });
    } else if (address.length <= 5) {
      return res.status(400).json({ status: 400, message: "invalid address" });
    } else if (city.length <= 3) {
      return res.status(400).json({ status: 400, message: "invalid city" });
    } else if (occupation.length <= 3) {
      return res
        .status(400)
        .json({ status: 400, message: "invalid occupation" });
    }

    // function to verify if the user already exist
    const foundUser = await db.collection("users").findOne({ email: email });

    // const user = findUser(res.locals.users, updatedUser._id);

    if (!foundUser) {
      const newUserId = v4();
      const newUser = await db
        .collection("users")
        .insertOne({ ...req.body, id: newUserId });
      return res.status(200).json({ status: 200, data: newUser });
    } else {
      res.status(400).json({ status: 400, message: "user already exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
  client.close();
};

/////////////////////////////////////////////////////
//      function to update the user information    //
////////////////////////////////////////////////////

const addUserInfo = async (req, res) => {
  const { email } = req.params;

  const { name, city, age, address, occupation, bio, picture, language } =
    req.body;

  console.log(req.body);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    //Info validation
    if (
      !name ||
      !city ||
      !age ||
      !address ||
      !occupation ||
      !picture ||
      !bio ||
      !language
    ) {
      return res
        .status(404)
        .json({ status: 404, message: "please add all the fields " });
    } else if (name.length <= 2) {
      return res.status(400).json({ status: 400, message: "Name too short" });
    } else if (address.length <= 5) {
      return res.status(400).json({ status: 400, message: "invalid address" });
    } else if (city.length <= 3) {
      return res.status(400).json({ status: 400, message: "invalid city" });
    } else if (occupation.length <= 3) {
      return res
        .status(400)
        .json({ status: 400, message: "invalid occupation" });
    }

    // getting the current user
    const currentUser = await db.collection("users").findOne({ email: email });

    //updating the  data
    const data = await db
      .collection("users")
      .updateMany({ currentUser }, { $set: { ...req.body } });
    console.log(req.body);
    res.status(200).json({ status: 200, data });

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUserInfo,
  getNewUser,
  getUserByEmail,
};