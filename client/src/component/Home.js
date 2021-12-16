import React from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import UsersContext from "./UsersContext";
import HomePicGrid from "./HomePicGrid";

const Home = () => {
  //example
  const { usersData, status, currentUser } = React.useContext(UsersContext);

  if (status === "loading") {
    return "loading...";
  }

  console.log("current user in Home -", currentUser);

  //If the current user is present in usersData then filter it out
  // let updatedUsers = [];
  // if (currentUser) {
  //   updatedUsers = usersData.map((user) => user["_id"] !== currentUser["_id"]);
  // }
  return (
    <div>
      <Background>
        <CarouselDiv>
          <Carousel>
            {usersData &&
              usersData.map((user) => {
                if (user["_id"] !== currentUser?._id) {
                  return (
                    <HomePicGrid key={user._id} user={user} id={user._id} />
                  );
                }
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
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 800px) {
    head {
      min-width: 800px;
      min-height: 800px;
    }
  }
`;

const CarouselDiv = styled.div`
  margin: auto;
  outline: none;
  width: 70%;
  height: 100vh;
  background-color: rgba(208, 77, 145, 0.4);
  margin-left: 880px;
  align-items: center;
  margin-inline: auto;
  padding-top: 15px;
  position: relative;

  @media screen and (min-width: 800px) {
    head {
      min-width: 900px;
      min-height: 900px;
      margin-inline: auto;
    }
  }
`;

export default Home;
