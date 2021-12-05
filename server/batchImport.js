require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const users = require("./data/user.json");
const languages = require("./data/languages.json");
const hobbies = require("./data/hobbies.json");
const religion = require("./data/religion.json");
const careers = require("./data/careers.json");

// Function that batch imports Items, Companies and Categories to Mongo
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("Befriends");

    // Adds users to Mongo
    await db.collection("users").insertMany(users);
    // // Adds languages to Mongo
    await db.collection("languages").insertMany(languages);
    // Adds hobbies to Mongo
    await db.collection("hobbies").insertMany(hobbies);
    // Adds religion to Mongo
    await db.collection("religion").insertMany(religion);
    // Adds careers to Mongo
    await db.collection("careers").insertMany(careers);

    console.log("Success");
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

batchImport();
