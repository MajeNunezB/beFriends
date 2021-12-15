import React, { useEffect, useState, useContext } from "react";
import UsersContext from "./UsersContext";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Friends = ({ friend }) => {
  const { status, currentUser } = useContext(UsersContext);
  const [oneUser, setOneUser] = useState(null);

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

  let history = useHistory();
  const handleDetail = () => {
    history.push(`/api/getUser/${friend}`);
  };

  if (status === "loading") {
    return "loading...";
  }
  return (
    <>
      {oneUser && (
        <DivFriends
          onClick={() => {
            handleDetail();
          }}
        >
          <Img src={oneUser.avatarUrl} />
          <Name>{oneUser.name}</Name>
        </DivFriends>
      )}
    </>
  );
};

const DivFriends = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border: 1px solid #fb5607;
  border-radius: 50%;
`;

const Name = styled.p`
  width: 150px;
  font-size: 16px;
  color: black;
  text-align: center;
  padding: 10px;
`;
export default Friends;
