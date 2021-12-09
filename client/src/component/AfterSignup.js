import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UsersContext from "./UsersContext";

const Signup = () => {
  const [newUser, setNewUser] = useState("");
  const { setStatus, status } = useContext(UsersContext);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    city: "",
    name: "",
    age: "",
    address: "",
    occupation: "",
    bio: "",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(userInfo);

    fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("reservation", JSON.stringify(data.data));
        console.log(data);
        // setNewUser(data._id);
        history.push("/");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleChange = (ev) => {
    setUserInfo({
      ...userInfo,
      [ev.target.name]: ev.target.value,
    });
  };

  if (status === "loading") {
    return "loading...";
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Title>Please complete the following information</Title>
        <Label>
          <Span>Name:</Span>
          <Input
            type="text"
            onChange={handleChange}
            value={userInfo?.name}
            required
          />
        </Label>
        <Label>
          <Span>City:</Span>
          <Input
            type="city"
            onChange={handleChange}
            value={userInfo?.city}
            required
          />
        </Label>
        <Label>
          <Span>Occupation</Span>
          <Input
            type="text"
            onChange={handleChange}
            value={userInfo?.Occupation}
            required
          />
        </Label>
        <Label>
          <Span>Age</Span>
          <Input
            type="text"
            onChange={handleChange}
            value={userInfo?.age}
            required
          />
        </Label>
        <Label>
          <Span>Address</Span>
          <Input
            type="text"
            onChange={handleChange}
            value={userInfo?.address}
            required
          />
        </Label>
        <Label>
          <Span>Bio</Span>
          <Input
            type=""
            onChange={handleChange}
            value={userInfo?.bio}
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
