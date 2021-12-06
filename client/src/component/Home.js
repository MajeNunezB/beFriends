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
      <Wrapper>
        <Div>
          <button onClick={removeItem}>Remove User</button>
          <button onClick={addItem}>Add Friend</button>
        </Div>
        <Hr />
        <CarouselDiv>
          <Carousel breakPoints={breakPoints}>
            {items.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
          </Carousel>
        </CarouselDiv>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Hr = styled.hr`
  width: 100%;
`;

const Div = styled.div`
  width: 100%;
`;

const CarouselDiv = styled.div`
  outline: none;
  box-shadow: inset 0 0 1px 0px #be95c4;
  width: 700px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  background-color: #be95c4;
  color: #fff;
  margin: 15px;
  font-size: 4em;
`;

export default Home;
