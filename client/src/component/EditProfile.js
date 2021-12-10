import React from "react";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UsersContext from "./UsersContext";

const EditProfile = () => {
  const { currentUser, setCurrentUser, setStatus, status } =
    useContext(UsersContext);
  const { language, setLanguage } = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    city: "",
    name: "",
    age: "",
    address: "",
    occupation: "",
    picture: "",
    bio: "",
    language: "",
  });

  //fetch to get list of different languages in quebec
  useEffect(() => {
    fetch("/languages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setLanguage(data.data);

        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch(`/api/addInfo/${currentUser.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // window.localStorage.setItem("reservation", JSON.stringify(data.data));
          setCurrentUser(data);
          history.push("/user/profile");
          setStatus("idle");
        } else if (data.status === 404) {
          setErrorMessage("Please complete the information");
        } else {
          setErrorMessage("error");
        }
      });
  };

  const handleChange = (ev) => {
    setUserInfo({
      ...userInfo,
      [ev.target.name]: ev.target.value,
    });
  };

  console.log(userInfo);

  if (status === "loading") {
    return "loading...";
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Title>Profile information</Title>
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            placeholder="enter your full name"
            name="name"
            onChange={handleChange}
            value={userInfo?.name}
            required
          />
        </Label>
        <Label>
          <Span>City</Span>
          <Input
            type="city"
            placeholder="Enter your address"
            name="city"
            onChange={handleChange}
            value={userInfo?.city}
            required
          />
        </Label>
        <Label>
          <Span>Occupation</Span>
          <Input
            type="text"
            name="occupation"
            placeholder="Enter your Occupation"
            onChange={handleChange}
            value={userInfo?.occupation}
            required
          />
        </Label>
        <Label>
          <Span>Age</Span>
          <Input
            type="text"
            name="age"
            onChange={handleChange}
            value={userInfo?.age}
            required
          />
        </Label>
        <Label>
          <Span>Address</Span>
          <Input
            type="text"
            name="address"
            onChange={handleChange}
            value={userInfo?.address}
            required
          />
        </Label>
        <Label>
          <Span>Bio</Span>
          <Input
            type="text"
            name="bio"
            onChange={handleChange}
            value={userInfo?.bio}
            required
          />
        </Label>
        <Div>
          <Label>
            <Span>Language</Span>
            <div>
              <Select
                defaultValue="default"
                name="language"
                onChange={(ev) => {
                  handleChange(ev);
                }}
              >
                <option value="" disabled selected>
                  Choose your Language
                </option>
                {language &&
                  language.map((ele, index) => {
                    return (
                      <option value={ele} key={index}>
                        {ele}
                      </option>
                    );
                  })}
              </Select>
            </div>
          </Label>
        </Div>
        <Button>Save</Button>
        {errorMessage && <P> {errorMessage} </P>}
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
const Div = styled.div`
  position: relative;
`;

const Select = styled.select`
  position: relative;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border: none;
  text-transform: capitalize;
  color: #fff;
  background: #292929;
  text-align: left;
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;

  ::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 6px;
    height: 6px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
  }
  :active {
    background: #222222;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
const P = styled.p`
  border: 1px solid #aa001e;
  color: #ca6702;
  font-weight: bold;
  text-align: center;
`;

export default EditProfile;
