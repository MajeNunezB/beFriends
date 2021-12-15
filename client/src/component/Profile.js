import React, { useContext, useState, useEffect } from "react";
import Upload from "./Upload";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import { Link } from "react-router-dom";
import Friends from "./Friends";
import PendingFriend from "./PendingFriend";

const Profile = () => {
  const { currentUser, status } = useContext(UsersContext);
  console.log(currentUser);
  const [pendingList, setPendingList] = useState(null);

  /// get the list of pendingRequests for current user to confirm query=friends/request?email=harry@gmail.com
  //api/friends/1/getPendingFriends
  useEffect(() => {
    if (currentUser) {
      console.log("is it calling after confirming a friend?");
      fetch(`/api/friends/request?email=${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("list - ", data);
          setPendingList(data.data);
        })
        .catch((err) => {
          console.log("error ", err);
        });
    }
  }, [currentUser]);

  console.log(pendingList);

  if (status === "loading") {
    return "loading...";
  }

  return (
    <>
      <Div1>
        <Container>
          <PicBack></PicBack>
          <PhotoDiv>
            {currentUser?.avatarUrl ? (
              <Img src={currentUser?.avatarUrl} />
            ) : (
              <Img src="https://res.cloudinary.com/drdbexqbf/image/upload/v1639065686/samples/Mypicture/no-user-image-icon-27_iukhui.png" />
            )}
          </PhotoDiv>
          <Div>
            <Nav to="/">Friends</Nav>
            <Nav to="/editProfile">Edit Profile</Nav>
          </Div>
          <Info>
            <Name>{currentUser?.name}</Name>
            <Email>{currentUser?.email}</Email>
          </Info>
          <Divider></Divider>
          <Biodiv>
            <Bio>
              {currentUser?.bio
                ? currentUser.bio
                : "Write a line to describe you !!"}
            </Bio>
          </Biodiv>
          <div>
            <Upload />
          </div>

          <FriendList>
            {currentUser &&
              currentUser.friends.map((friend) => {
                return <Friends key={friend} friend={friend} />;
              })}
            {pendingList &&
              pendingList.map((friendPending) => {
                return (
                  <PendingFriend
                    key={friendPending}
                    friendPending={friendPending}
                  />
                );
              })}
          </FriendList>
        </Container>
      </Div1>
    </>
  );
};

const Div1 = styled.div`
  background-color: #f0e6ef;
  margin-top: -35px;
`;
const Container = styled.div`
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const FriendList = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const FriendTitle = styled.div`
//   margin-top: 10px;
//   font-family: "Open Sans";

//   font-size: 18pt;
//   color: #777;
// `;

const PicBack = styled.div`
  background: #eee;
  background-image: url("https://res.cloudinary.com/drdbexqbf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1639191148/samples/Mypicture/antoine-rault-IhWRrZx4-kk-unsplash_fc1mnm.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  height: 250px;
  @media (max-width: 800px) {
    height: 150px;
  }
`;

const PhotoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  /* background-image: url("https://res.cloudinary.com/drdbexqbf/image/upload/v1639065686/samples/Mypicture/no-user-image-icon-27_iukhui.png"); */
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
  background-size: cover;
`;

const Div = styled.div`
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  font-family: "Montserrat", sans-serif;
`;

const Nav = styled(Link)`
  margin-top: -15px;
  font-size: 10pt;
  padding: 15px;
  color: #bbb;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Name = styled.h1`
  margin-top: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18pt;
  color: #777;
`;

const Email = styled.h1`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 11pt;
  color: #aaa;
`;

const Divider = styled.div`
  margin-right: 400px;
  margin-left: 400px;
  border-top: 2px solid #ededed;
`;

const Biodiv = styled.div`
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
`;

const Bio = styled.p`
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 11pt;
  font-family: "Open Sans";
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
`;

export default Profile;
