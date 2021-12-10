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
const getLanguage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");
    const languages = await db.collection("languages").find({}).toArray();

    res.status(200).json({ status: 200, message: "Success!", data: languages });

    client.close();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all users 😭",
    });
  }
};

module.exports = { getLanguage };
