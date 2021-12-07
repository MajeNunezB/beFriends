import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </Button>
    )
  );
};

const Button = styled.button`
  color: #fff;
  outline: none;
  background-color: transparent;
  border: none;
  color: #fff;
  padding: 10px 20px;
  margin-left: 600px;
  cursor: pointer;
  position: relative;
  font-weight: 700;
  opacity: 0.7;
`;

export default LogoutButton;
