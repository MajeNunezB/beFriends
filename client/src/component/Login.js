import React from "react";
import { useState } from "react";
import styled from "styled-components";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <Background>
        <Form onSubmit={handleSubmit}>
          <Title>Login</Title>
          <Label>
            <span>Email:</span>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Label>
          <Label>
            <span>Password:</span>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Label>

          <Button>
            <LoginButton />
          </Button>
        </Form>
      </Background>
    </div>
  );
};

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  max-width: 360px;
  margin: 60px auto;
  padding: 20px;
  z-index: 1;
`;

const Input = styled.input`
  padding: 8px 6px;
  font-size: 1em;
  width: 100%;
  color: #be95c4;
  z-index: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  z-index: 1;
`;

const Background = styled.div`
  margin: 0px;
  background-image: url("/picture/fondo.jpg");
  min-height: 100vh;
  background-size: cover;
  margin-top: -65px;
  position: relative;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 7px 12px;
  border-radius: 4px;
  color: #be95c4;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  font-style: "Poppins", sans-serif;

  &:hover {
    background: #be95c4;
    color: white;
  }
`;

export default Login;
