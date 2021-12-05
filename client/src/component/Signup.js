import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, givenName);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Title>Signup</Title>
        <Label>
          <Span>Email:</Span>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Label>
        <Label>
          <Span>Password:</Span>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Label>
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            onChange={(e) => setGivenName(e.target.value)}
            value={givenName}
          />
        </Label>
        <Button>Signup</Button>
      </Form>
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
const Label = styled.label`
  display: block;
  margin: 30px auto;
`;

const Span = styled.span`
  display: block;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 8px 6px;
  font-size: 1em;
  width: 100%;
  color: #be95c4;
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

export default Signup;
