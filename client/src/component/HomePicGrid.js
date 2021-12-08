import React from "react";
import UsersContext from "./UsersContext";
import { useContext } from "react";
import styled from "styled-components";

const HomePicGrid = ({ user }) => {
  const { status } = useContext(UsersContext);

  if (status === "loading") {
    return "loading...";
  }
  return (
    <>
      <div key={user._id}>
        <LinkImg>
          <Img src={user && user.avatarUrl} />
        </LinkImg>
        <Name>{user.name}</Name>
      </div>
    </>
  );
};

const LinkImg = styled.div``;

const Name = styled.span`
  text-align: center !important;
  padding-top: 20px;
  font-weight: bold;
  color: white;
  opacity: 0.7;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  /* padding: 15px; */
  align-items: center;
  height: 500px;
  width: 500px;
  color: #fff;
  margin: 15px;
  /* margin-top: -50px; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;

  @media screen and (min-width: 576px) {
    head {
      width: min(90%.70.5rem);
      min-width: 400px;
      margin: 15px;
    }
  }
`;

export default HomePicGrid;
