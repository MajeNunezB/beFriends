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

    res.status(200).json({ status: 200, message: "Succsess!", data: users });

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
  console.info(id);

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

///////////////////////////////////////////////////
//            Function to add new user           //
//////////////////////////////////////////////////

const addNewUser = async (req, res) => {
  const { name, city, age, email } = req.body;

  console.log(req.body);

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    user.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ message: "user already exists with that email" });
      }
    });

    if (!name || !email || !city || !age) {
      return res
        .status(404)
        .json({ status: 404, message: "please add all the fields " });
    } else {
      const userId = v4();
      const user = await db
        .collection("users")
        .insertOne({ ...req.body, id: userId });

      return res.status(200).json({ status: 200, data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error" });
  }
  client.close();
};

module.exports = {
  getUsers,
  getUserById,
  addNewUser,
};
