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
  cursor: pointer;
  position: relative;
  /* font-weight: 700; */
  margin-top: 10px;
  opacity: 0.7;
  padding: 10px;
`;

export default LogoutButton;
