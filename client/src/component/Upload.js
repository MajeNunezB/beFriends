import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import { useAuth0 } from "@auth0/auth0-react";

const Upload = () => {
  const [image1, setImage1] = useState("");
  const { currentUser, status, setCurrentUser } = useContext(UsersContext);
  const [url, setUrl] = useState(null);
  const { user } = useAuth0();
  console.log(user, currentUser);

  //function to send image to cloudinary and transform it into a URL -https://www.youtube.com/watch?v=uP568vOaBbQ&t=469s
  const postDetails = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "Mypicture");
    data.append("cloud-name", `${process.env.REACT_APP_CLOUDINARY_NAME}`);
    console.log(process.env);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.url);
        setUrl(data.url);
        return fetch(`/user/picture/${user.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ url: data.url }),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentUser(data.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to render the file input and the submit button to update the picture

  if (status === "loading") {
    return "loading...";
  }

  return (
    <div>
      <Form encType="multipart/form-data" onSubmit={(ev) => postDetails(ev)}>
        <Input
          type="file"
          onChange={(e) => {
            setImage1(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Button type="submit">submit</Button>
      </Form>

      {/* <img src={url && url} /> */}
    </div>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

// const Img = styled.img`
//   width: 200px;
//   height: 200px;
//   margin-top: 8px;
//   vertical-align: middle;
// `;

const Input = styled.input`
  background-color: white;
  color: transparent;
  font-weight: 700px;
`;

const Button = styled.button`
  color: black;
  font-size: 0.678rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  border-radius: 2px;
  border: 1px solid black;
  width: 90px;
`;

// const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   padding: 0 4px;
// `;

// const Column = styled.div`
//   flex: 50%;
//   padding: 0 4px;
// `;

export default Upload;
