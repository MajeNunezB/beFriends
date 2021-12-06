import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const Home = () => {
  //example
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  //addFriend
  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  //dont Like remove user
  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  return (
    <div>
      <Background>
        <CarouselDiv>
          <Button onClick={removeItem}>Remove User</Button>
          <Button onClick={addItem}>Add Friend</Button>
          <Carousel breakPoints={breakPoints}>
            {items.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
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

const Button = styled.button`
  padding: 15px;
  border: none;
  width: 200px;
  align-content: center;
  background-color: transparent;
  margin-left: 70px;
  color: #9d8189;

  &:hover {
    animation: bouncy 3s infinite linear;
    position: relative;

    @keyframes bouncy {
      0% {
        top: 0em;
      }
      40% {
        top: 0em;
      }
      43% {
        top: -0.9em;
      }
      46% {
        top: 0em;
      }
      48% {
        top: -0.4em;
      }
      50% {
        top: 0em;
      }
      100% {
        top: 0em;
      }
    }
  }
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
      min-height: 600px;
    }
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  /* padding: 15px; */
  align-items: center;
  height: 500px;
  width: 150%;
  background-color: #9d8189;
  color: #fff;
  margin: 15px;
  margin-top: 4s0px;
  font-size: 4em;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* border: 3px solid blue; */

  @media screen and (min-width: 576px) {
    head {
      width: min(90%.70.5rem);
      min-width: 400px;
      margin: 15px;
    }
  }
`;

export default Home;
