import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Upload from "./Upload";
import styled from "styled-components";
import UsersContext from "./UsersContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UsersContext);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user.name);
  return (
    isAuthenticated && (
      <div>
        <Img src={user.picture} alt="user picture" />
        <Upload />
        <Name>{}</Name>
        <p>{user.email}</p>
      </div>
    )
  );
};
const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const Name = styled.h2`
  font-size: 2px;
  padding: 15px;
`;

export default Profile;
