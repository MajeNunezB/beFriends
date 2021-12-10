import React from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import UsersContext from "./UsersContext";
import HomePicGrid from "./HomePicGrid";

const Home = () => {
  //example
  const { userData, status, currentUser } = React.useContext(UsersContext);

  if (status === "loading") {
    return "loading...";
  }
  return (
    <div>
      <Background>
        <CarouselDiv>
          <Carousel>
            {userData &&
              userData.map((user) => {
                return <HomePicGrid key={user._id} user={user} />;
              })}
          </Carousel>
        </CarouselDiv>
      </Background>
    </div>
  );
};

const Background = styled.div`
  background-image: url("/picture/jordan.jpg");
  opacity: 0.8;
  background-size: cover;
  position: relative;
`;

const CarouselDiv = styled.div`
  margin: auto;
  outline: none;
  width: 50%;
  height: 95vh;
  background-color: rgba(208, 77, 145, 0.4);
  margin-left: 880px;
  padding: 80px;
  margin-inline: auto;

  /* box-shadow: inset 0 0 1px 0px #be95c4; */
  /* border: 3px solid red; */

  @media screen and (min-width: 576px) {
    head {
      min-width: 400px;
      min-height: 400px;
    }
  }
`;

export default Home;
