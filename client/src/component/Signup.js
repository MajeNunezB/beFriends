import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [newUser, setNewUser] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/api/adduser", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        address: address,
        age: age,
        city: city,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNewUser(json._id);
        history.push("/");
      })
      .catch((err) => {
        console.log("error");
      });
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
            required
          />
        </Label>
        <Label>
          <Span>City:</Span>
          <Input
            type="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
        </Label>
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </Label>
        <Label>
          <Span>Age</Span>
          <Input
            type="text"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            required
          />
        </Label>
        <Label>
          <Span>Address</Span>
          <Input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
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
    background: #be95c4 !important;
    color: white;
    box-shadow: 0 30px 45px -15px rgba(255, 16, 39, 0.57);
  }
`;

export default Signup;
