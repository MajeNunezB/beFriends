require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const HandlerPicture = async (req, res) => {
  const { email } = req.params;

  const { url } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  // if (!url) {
  //   return res.status(404).json({ message: "please add a picture" });
  // }
  try {
    await client.connect();

    const db = client.db("beFriends");

    // getting the current user
    let currentUser = await db.collection("users").findOne({ email: email });

    // updating the  data
    const data = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { avatarUrl: url } });

    //taking the current user info updated
    currentUser = await db.collection("users").findOne({ email: email });

    res.status(200).json({ status: 200, currentUser: currentUser });

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: err.message });
  }
};
module.exports = { HandlerPicture };
