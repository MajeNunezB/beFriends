// require("dotenv").config();

// const { MongoClient } = require("mongodb");
// const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// ///////////////////////////////
// // Function to Get all religion //
// //////////////////////////////
// const getReligion = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);

//   try {
//     await client.connect();

//     const db = client.db("beFriends");
//     const religion = await db.collection("religion").find({}).toArray();

//     res.status(200).json({ status: 200, message: "Success!", data: religion });

//     client.close();
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Something went wrong getting all users 😭",
//     });
//   }
// };

// module.exports = { getReligion };
