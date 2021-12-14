import React, { useContext } from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { FiUser, FiHome } from "react-icons/fi";
import UsersContext from "./UsersContext";

const Header = () => {
  const { currentUser, status } = useContext(UsersContext);

  const handlePropagation = (ev) => {
    ev.stopPropagation();
  };

  if (status === "loading") {
    return "loading...";
  }
  return (
    <div>
      <Wrapper>
        <Holder>
          <Img src={currentUser?.avatarUrl} />

          <Title to="/" onClick={(ev) => handlePropagation(ev)}>
            BeFriends
          </Title>
        </Holder>
        <Div>
          <Linkicon to={`/user/profile/`}>
            <FiUser />
          </Linkicon>
          <Link1 to="/">
            <FiHome />
          </Link1>
          <LoginButton onClick={(ev) => handlePropagation(ev)} />
          <LogoutButton onClick={(ev) => handlePropagation(ev)} />
        </Div>
      </Wrapper>
    </div>
  );
};

const Img = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const Header1 = styled.div`
  padding: 20px 10px;
  margin-left: -16px;
  text-decoration-line: none;
  color: white;
  opacity: 0.7;
  padding: 30px;
`;

const Header2 = styled(Link)`
  padding: 20px 10px;
  margin-left: 16px;
  text-decoration-line: none;
  color: white;
  opacity: 0.7;
  padding: 30px;
`;

const Linkicon = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 10px;
  /* margin-left: 500px; */
  font-weight: 700;
  opacity: 0.7;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  padding: 30px;
  line-height: 70px;
`;

const Link1 = styled(Link)`
  color: #fff;
  margin-top: 10px;
  font-weight: 700;
  opacity: 0.7;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 18px;
  padding-right: 70px;
  @media (max-width: 667px) {
    display: flex;
    align-items: center;
    /* position: absolute; */
    background-color: #60435f;
    right: 0;
    left: 0;
    text-align: center;
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: center;
  color: white;
  background-color: #60435f;
  display: flex;
  justify-content: space-between;
  height: 70px;
  @media (max-width: 667px) {
    height:30px
    font-size: 24px;
   
  }
`;

export default Header;
