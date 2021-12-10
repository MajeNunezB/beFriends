import React, { useContext } from "react";
import Upload from "./Upload";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, status } = useContext(UsersContext);
  console.log(currentUser);

  if (status === "loading") {
    return "loading...";
  }

  return (
    <>
      <Container>
        <PicBack></PicBack>
        <PhotoDiv>
          {currentUser ? (
            <Img src={currentUser?.picture} />
          ) : (
            <Img src="https://res.cloudinary.com/drdbexqbf/image/upload/v1639065686/samples/Mypicture/no-user-image-icon-27_iukhui.png" />
          )}
        </PhotoDiv>
        <Div>
          <Nav to="/">Friends</Nav>
          <Nav to="/editProfile">Edit Profile</Nav>
        </Div>

        <div>{/* <Img src={user.avatarUrl} alt="Profile" /> */}</div>
        <Info>
          <Name>{currentUser?.name}</Name>
          <Email>{currentUser?.email}</Email>
        </Info>
        <Divider></Divider>
        <Biodiv>
          <Bio>
            love to travel, eat and meet people!!<span>{currentUser?.bio}</span>
          </Bio>
        </Biodiv>
        <div>
          {/* <pre> {JSON.stringify(user, null, 2)} </pre> */}
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
  background-image: url("https://res.cloudinary.com/drdbexqbf/image/upload/v1639076107/samples/Mypicture/sirisvisual-Qh6yUFl7P5E-unsplash_chmx0p.jpg");
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

// const Img = styled.img`
//   width: 200px;
//   height: 200px;
//   margin-top: -120px;
//   border-radius: 100px;
//   border: 4px solid #fff;
// `;

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
  margin-top: -5px;
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
