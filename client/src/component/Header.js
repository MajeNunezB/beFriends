import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Wrapper>
        <Title>BeFriends</Title>
        <Header1 to={"/login"}>Login</Header1>
        <Header1 to={"/signup"}>Signup</Header1>
      </Wrapper>
    </div>
  );
};
const Header1 = styled(Link)`
  padding: 20px 10px;
  margin-left: 16px;
  text-decoration-line: none;
  color: white;
`;

const Title = styled.h1`
  margin-right: auto;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.2em;
  padding: 10px;
`;

// const Div = styled.div`
//   margin-left: 16px;
// `;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: center;
  color: white;
  background-color: #be95c4;
`;

export default Header;
