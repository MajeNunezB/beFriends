import React, { useEffect, useState, useContext } from "react";
import UsersContext from "./UsersContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ConfirmButton from "./ConfirmButton";
import { useHistory } from "react-router-dom";

const PendingFriend = ({ friendPending }) => {
  const [oneUser, setOneUser] = useState(null);
  const { currentUser, status } = useContext(UsersContext);
  const { refresh, setRefresh } = useContext(UsersContext);
  const history = useHistory();

  //fetch to get the pending user data

  React.useEffect(() => {
    fetch(`/api/getUser/${friendPending}`)
      .then((res) => res.json())
      .then((data) => {
        setOneUser(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  //friend confirmation Button
  const handleConfirmFriend = () => {
    const params = {
      email: currentUser.email,
      friendId: friendPending,
    };

    const query = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    fetch(`/api/friends/confirm?${query}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        window.location.reload(false);

        // setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (status === "loading") {
    return "loading...";
  }

  return (
    <div>
      {oneUser && (
        <DivFriends>
          <Img src={oneUser.avatarUrl} />
          <Name>{`Confirm ${oneUser.name}'s friend request`}</Name>
          <ConfirmButton
            friendPending={friendPending}
            handleConfirmFriend={handleConfirmFriend}
          ></ConfirmButton>
        </DivFriends>
      )}
    </div>
  );
};

const DivFriends = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  border: 1px solid #fb5607;
  filter: grayscale(100%);
  border-radius: 50%;
`;

const Name = styled.p`
  width: 100px;
  font-size: 14px;
  color: #bbb;
  text-align: center;
`;

export default PendingFriend;
