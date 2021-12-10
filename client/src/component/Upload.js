import React, { useState, useContext } from "react";
import styled from "styled-components";
import UsersContext from "./UsersContext";

const Upload = ({ user1 }) => {
  const [image, setImage] = useState("");
  const { currentUser, status } = useContext(UsersContext);

  console.log(user1);
  //function to send image to cloudinary and transform it into a URL
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Sample");
    data.append("cloud-name", "drdbexqbf");
    fetch("https://api.cloudinary.com/v1_1/drdbexqbf/image/upload", {
      method: "Post",
      headers: { "Content-type": "application/json" },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      <Form>
        <Input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <Button onClick={(e) => postDetails(e)}>submit</Button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

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
  width: 100px;
`;

export default Upload;

//FileReader.readAsDataURL()
// The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
