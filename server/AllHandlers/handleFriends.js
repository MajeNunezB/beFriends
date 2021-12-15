require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// PATCH. requires the ids of 2 people to make them friends
// ids should be sent along as an array called newFriends in the body
// id = 6 sends a friend request to harry
const sendFriendRequest = async (req, res) => {
  //getting current user and friendId
  const { currentUserId, email, friendId } = req.query;

  console.log("email received : ", email);
  console.log("friendId received : ", friendId);

  // Step 1: Get the id of new friend from request
  // Step 2: Add the friend id into currentUser's friend's array
  // Step 3: return success response/error

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    //getting into the current user data
    // let wholeUser = await db.collection("users").findOne({ email: email });
    let wholeFriendId = await db.collection("users").findOne({ _id: friendId });

    //adding a pending request to the user data
    const { pendingFriends: existingPendingFriends = [] } = wholeFriendId; //wholeUser

    // const isExists = existingPendingFriends.includes(friendId);
    const isExists = existingPendingFriends.includes(currentUserId);

    if (!isExists) {
      //updating the current user pending list with the new friendId
      const result = await db.collection("users").updateOne(
        { _id: friendId },
        // { email: email },
        { $set: { pendingFriends: [...existingPendingFriends, currentUserId] } } //friendId
      );

      console.log("did the new friend id get added? ", result);

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
  //email=currentUser    confirmationFriendId= pending request waiting to be confirmed
  const { confirmationFriendId, email } = req.query;

  // console.log("email received : ", email);
  // console.log("confirmationFriendId received : ", confirmationFriendId);

  // Step 1: Figure out how many pending requests currentUser has
  // Step 2: match the confirmation friend request id with pending requests of current user
  // Step 3: if you find confirmation friend id in pending request then move that to friends array in order to confirm the friend

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("beFriends");

    //entering to the whole current user data
    let wholeUser = await db.collection("users").findOne({ email: email });

    //I am using JS Object destructuring to extract pendingFriends and friends array from currentUser
    //If pendingFriends and friends array are not present in a user then assign it with a default value []
    const {
      pendingFriends: existingPendingFriends = [],
      friends: existingFriends = [],
    } = wholeUser;

    //check if confirmation friend id exists in the pending requests of user
    const isPendingRequestExists =
      existingPendingFriends.includes(confirmationFriendId);

    //if it exists, then get rid of it from pending requests and add it to friends array
    if (isPendingRequestExists) {
      //by filtering confirmation friend Id from pending requests array, to get a new list of pending requests
      const listWithoutConfirmationFriendId = existingPendingFriends.filter(
        (pendingRequest) => pendingRequest !== confirmationFriendId
      );

      const result = await db.collection("users").updateOne(
        { email: email },
        {
          $set: {
            pendingFriends: listWithoutConfirmationFriendId,
            friends: [...existingFriends, confirmationFriendId],
          },
        }
      );

      res.status(200).json({
        status: 200,
        message: "Friend successfully confirmed",
      });
    } else {
      //If user does not have  a pending request for requested confirmation id then we should inform frontend
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
    // console.log( pendingFriends);
    // const listOfFriendsRequest = await db
    //   .collection("users")
    //   .find({ _id: { $in: pendingFriends } });

    // console.log( listOfFriendsRequest);

    //SQL: select users from table where id in [1,2,3]

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
