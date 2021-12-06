import React from "react";
import styled from "styled-components";

const Background = () => {
  return (
    <div>
      <Pic src="/picture/fondo.jpg" />
    </div>
  );
};
const Pic = styled.div`
  margin: 0px;
  background-image: url("/picture/fondo.jpg");
  min-height: 100vh;
  background-size: cover;
  margin-top: -65px;
  opacity: 0.5;
`;

export default Background;
