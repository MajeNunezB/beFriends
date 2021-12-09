import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Upload from "./Upload";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  // const { name, picture, email } = user;

  return (
    <>
      <Container>
        <PicBack></PicBack>
        <Div>
          <Nav to="/">Friends</Nav>
          <Nav to="/">About</Nav>
        </Div>
        <div>{/* <Img src={user.avatarUrl} alt="Profile" /> */}</div>
        <div>
          {/* <h2>{user.name}</h2>
          <p>{user.email}</p> */}
        </div>
        <div>
          <pre>{/* {JSON.stringify(user, null, 2)} */}</pre>
          <Upload />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const PicBack = styled.div`
  background: #eee;
  background-image: url("https://res.cloudinary.com/drdbexqbf/image/upload/v1639072204/samples/Mypicture/ian-schneider-PAykYb-8Er8-unsplash_vk2hnt.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  opacity: 0.6;
  height: 250px;
  @media (max-width: 800px) {
    height: 150px;
  }
`;

const Div = styled.div`
  position: relative;
  cursor: pointer;
  right: -96%;
  top: 25px;
  font-size: 18px !important;
  color: #fff;
  @media (max-width: 800px) {
    right: -90%;
  }
`;

const Nav = styled(Link)`
  text-decoration: none;
  padding: 20px 20px 0px 20px;
  display: flex;
`;

// const Img = styled.img`
//   width: 200px;
//   height: 200px;
//   margin-top: -120px;
//   border-radius: 100px;
//   border: 4px solid #fff;
// `;

export default Profile;
