import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import Login from "./Login";

const Header = () => {
  return (
    <div>
      <Wrapper>
        <Title to="/">BeFriends</Title>
        <div>
          <Header1 to="/Login">Login</Header1>
          <Header1 to={"/signup"}>Signup</Header1>
        </div>
      </Wrapper>
    </div>
  );
};

const Header1 = styled(Link)`
  padding: 20px 10px;
  margin-left: 16px;
  text-decoration-line: none;
  color: white;
  opacity: 0.7;
  padding: 30px;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  padding: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: center;
  color: white;
  background-color: #be95c4;
  display: flex;
  justify-content: space-between;
  height: 50px;
`;

export default Header;
