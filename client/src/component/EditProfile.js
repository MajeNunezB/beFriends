import React from "react";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UsersContext from "./UsersContext";
import { useAuth0 } from "@auth0/auth0-react";

const EditProfile = () => {
  const {
    currentUser,
    setCurrentUser,
    setStatus,
    status,
    refresh,
    setRefresh,
  } = useContext(UsersContext);
  const [language, setLanguage] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { user } = useAuth0();

  const [userInfo, setUserInfo] = useState({
    city: currentUser?.city,
    name: currentUser?.name,
    age: currentUser?.age,
    address: currentUser?.address,
    occupation: currentUser?.occupation,
    // picture: "",
    bio: currentUser?.bio,
    language: currentUser?.language,
  });

  //fetch to get list of different languages in quebec
  useEffect(() => {
    fetch("/hobbies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHobbies(data.data);

        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  //fetch to get list of different languages in quebec
  useEffect(() => {
    fetch("/api/occupation")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOccupation(data.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  //fetch to get list of different languages in quebec
  useEffect(() => {
    fetch("/languages")
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data.data);

        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  //fetch to patch the data
  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch(`/api/addInfo/${user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // window.localStorage.setItem("reservation", JSON.stringify(data.data));
          setCurrentUser(data.currentUser);
          // setRefresh(!refresh);
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

  if (status === "loading") {
    return "loading...";
  }

  return (
    <Div2>
      <Div1>
        <Form onSubmit={handleSubmit}>
          <Title>Profile information</Title>
          <Label>
            <Span>Name</Span>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={userInfo?.name}
              // required
            />
          </Label>
          <Label>
            <Span>City</Span>
            <Input
              type="city"
              name="city"
              onChange={handleChange}
              value={userInfo?.city}
              // required
            />
          </Label>
          <Div>
            <Label>
              <Span>Occupation</Span>
              <div>
                <Select
                  name="occupation"
                  onChange={(ev) => {
                    handleChange(ev);
                  }}
                >
                  <option value="default">Choose your occupation</option>
                  {occupation &&
                    occupation?.map((ele, index) => {
                      return (
                        <option value={ele.Careers} key={index}>
                          {ele.Careers}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </Label>
          </Div>
          <Label>
            <Span>Age</Span>
            <Input
              type="text"
              name="age"
              onChange={handleChange}
              value={userInfo?.age}
              // required
            />
          </Label>
          <Label>
            <Span>Address</Span>
            <Input
              type="text"
              name="address"
              onChange={handleChange}
              value={userInfo?.address}
              // required
            />
          </Label>
          <Label>
            <Span>Bio</Span>
            <Input
              type="text"
              name="bio"
              onChange={handleChange}
              value={userInfo?.bio}
              // required
            />
          </Label>
          <Div>
            <Label>
              <Span>Language</Span>
              <div>
                <Select
                  name="language"
                  onChange={(ev) => {
                    handleChange(ev);
                  }}
                >
                  <option value="default">Choose your Language</option>
                  {language &&
                    language?.map((ele, index) => {
                      return (
                        <option value={ele.languages} key={index}>
                          {ele.languages}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </Label>
          </Div>
          <Button type="submit">Save</Button>
          {errorMessage && <P> {errorMessage} </P>}
        </Form>
      </Div1>
    </Div2>
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
const Div2 = styled.div`
  background-color: #dcdfe5;
  margin-top: -60px;
`;

const Div1 = styled.div`
  max-width: 850px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  margin-top: 60px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
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
