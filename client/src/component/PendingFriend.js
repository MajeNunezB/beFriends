import React, { useEffect, useState, useContext } from "react";
import UsersContext from "./UsersContext";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PendingFriend = ({ friendPending }) => {
  const [oneUser, setOneUser] = useState(null);
  const { status } = useContext(UsersContext);

  console.log(friendPending);
  //fetch to get the pendding user data

  React.useEffect(() => {
    fetch(`/api/getUser/${friendPending}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOneUser(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  console.log(oneUser);

  if (status === "loading") {
    return "loading...";
  }
  return (
    <div>
      {oneUser && (
        <DivFriends>
          <Img src={oneUser.avatarUrl} />
          <Name>{`${oneUser.name}would like to be your friend`}</Name>
        </DivFriends>
      )}
    </div>
  );
};

const DivFriends = styled(Link)`
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
