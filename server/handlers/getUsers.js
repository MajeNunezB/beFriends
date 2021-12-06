// require("dotenv").config();

// const { MongoClient } = require("mongodb");
// const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Function to get all Items
// const getUsers = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);

//   try {
//     await client.connect();

//     const db = client.db("beFriends");
//     const items = await db.collection("users").find({}).toArray();

//     res.status(200).json({ status: 200, message: "Succsess!", data: items });

//     client.close();
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         status: 500,
//         message: "Something went wrong getting all items😭",
//       });
//   }
// };

// module.exports = {
//   getUsers,
// };
