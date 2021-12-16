require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// id = 6 sends a friend request to harry
const sendFriendRequest = async (req, res) => {
  //getting current user and friendId
  const { currentUserId, email, friendId } = req.query;

  //here currentUserId: laura's, friendId: nate's

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    //getting into the  data
    let wholeFriendId = await db.collection("users").findOne({ _id: friendId });

    //adding a pending request to the user data
    const {
      pendingFriends: existingPendingFriends = [],
      friends: existingFriends = [],
    } = wholeFriendId;

    const isExists =
      existingPendingFriends.includes(currentUserId) ||
      existingFriends.includes(currentUserId);

    if (!isExists) {
      //updating the current user pending list with the new friendId
      const result = await db.collection("users").updateOne(
        { _id: friendId },
        { $set: { pendingFriends: [...existingPendingFriends, currentUserId] } } //
      );

      //if the friendId is pending then status(200)
      res.status(200).json({
        status: 200,
        message: "Friend successfully added",
      });
    } else {
      res.status(400).json({ status: 400, message: "Friend is already added" });
    }

    //otherwise error
    client.close();
  } catch (e) {
    console.log("error in catch - ", e);
    res.status(500).json({ status: 500, message: "Error!" });
  }
};

/////////////////////////////////////////////////////////////
//         function to accept friend request              //
////////////////////////////////////////////////////////////

//harry accepts the friend request of id = 6
const confirmFriendRequest = async (req, res) => {
  //email=currentUser    friendId= pending request waiting to be confirmed

  const { friendId, email } = req.query;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    //entering to the whole current user data
    let wholeUser = await db.collection("users").findOne({ email: email });

    //I am using JS Object destructuring to extract pendingFriends and friends array from currentUser
    //If pendingFriends and friends array are not present in a user the default value []
    const {
      pendingFriends: existingPendingFriends = [],
      friends: existingFriends = [],
    } = wholeUser;

    //checking if confirmation friend id exists in the pending requests of user
    const isPendingRequestExists = existingPendingFriends.includes(friendId);

    //if it exists, deleted it from pending requests and add it to friends array
    if (isPendingRequestExists) {
      // filtering confirmation friend Id from pending requests array, to get the new list of pending requests
      const listWithoutConfirmationFriendId = existingPendingFriends.filter(
        (pendingRequest) => pendingRequest !== friendId
      );

      const result = await db.collection("users").updateOne(
        { email: email },
        {
          $set: {
            pendingFriends: listWithoutConfirmationFriendId,
            friends: [...existingFriends, friendId],
          },
        }
      );

      res.status(200).json({
        status: 200,
        message: "Friend successfully confirmed",
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Friend does not exist",
      });
    }
    client.close();
  } catch (e) {
    console.log("error in catch - ", e);
    res.status(500).json({ status: 500, message: "Error!" });
  }
};

//////////////////////////////////////////////////////////////////////////////////
// get list of pending friends
/////////////////////////////////////////////////////////////////////////////////
const getPendingFriendsList = async (req, res) => {
  const { email } = req.query;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");
    let wholeUser = await db.collection("users").findOne({ email: email });
    const { pendingFriends } = wholeUser;

    res
      .status(200)
      .json({ status: 200, message: "Success!", data: pendingFriends });

    client.close();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all pending users 😭",
    });
  }
};

const handleRemoveFriend = (req, res) => {
  // const user_1 = await db.collection("users").findOne({ _id: _id });
  // const user_2 = await db.collection("users").findOne({ _id: _id });
  // // if either of the userIds don't exist, stop and return error
  // if (!user_1 || !user_2)
  //   return sendResponse(
  //     res,
  //     404,
  //     req.body,
  //     "One or both of the users not found."
  //   );
  // // if users are already friends, make them NOT friends
  // if (user_1.friends.includes(user_2) || user_2.friends.includes(user_1)) {
  //   user_1.friends.splice(user_1.friends.indexOf(user_2), 1);
  //   user_2.friends.splice(user_2.friends(user_1), 1);
  //   return sendResponse(
  //     res,
  //     200,
  //     [user_1.friends, user_2.friends],
  //     "Users are no longer friends."
  //   );
  // currentUser.friends.push(user_2);
  // user_2.friends.push(currentUser);
};

module.exports = {
  sendFriendRequest,
  handleRemoveFriend,
  confirmFriendRequest,
  getPendingFriendsList,
};
