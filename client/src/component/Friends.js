import React, { useEffect, useState, useContext } from "react";
import UsersContext from "./UsersContext";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Friends = ({ friend }) => {
  const { status, currentUser } = useContext(UsersContext);
  const [oneUser, setOneUser] = useState(null);

  //   console.log(friend);

  //getting one user
  React.useEffect(() => {
    fetch(`/api/getUser/${friend}`)
      .then((res) => res.json())
      .then((data) => {
        setOneUser(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  //   console.log(oneUser);

  if (status === "loading") {
    return "loading...";
  }
  return (
    <>
      {oneUser && (
        <DivFriends>
          <Img src={oneUser.avatarUrl} />
          <Name>{oneUser.name}</Name>
        </DivFriends>
      )}
    </>
  );
};

const DivFriends = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 20px;
  margin-left: 100px;
  border: 1px solid #fb5607;
  border-radius: 50%;
`;

const Name = styled.p`
  width: 150px;
  font-size: 1em;
  color: black;
  text-align: center;
  font-size: 1em;
`;
export default Friends;
