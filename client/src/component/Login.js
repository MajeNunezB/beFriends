import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label>
          <span>Email:</span>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Label>
        <Label>
          <span>Password:</span>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Label>
        <Button>Login</Button>
      </Form>
      <Background src="/picture/fondo.jpg" />
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
`;

const Input = styled.input`
  padding: 8px 6px;
  font-size: 1em;
  width: 100%;
  color: #be95c4;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
`;

const Button = styled.button`
  background: none;
  border: 2px solid #be95c4;
  padding: 6px 12px;
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

const Background = styled.img`
  object-fit: cover;
  width: 100vw;
  max-height: 100vw;
  margin-top: -380px;
  position: absolute;
  opacity: 0.3;
`;

export default Login;
