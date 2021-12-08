import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      ) : (
        ""
      )}
    </>
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

export default LoginButton;
