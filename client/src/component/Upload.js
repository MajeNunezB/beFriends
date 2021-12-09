import React, { useState, useContext } from "react";
import styled from "styled-components";
import UsersContext from "./UsersContext";

const Upload = ({ user1 }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [textLength, setTextLength] = useState(281);
  const [statusUpdate, setStatusUpdate] = useState("");
  const { useData, status } = useContext(UsersContext);

  console.log(user1);
  //function to send image to cloudinary and transform it into a URL
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Mypicture");
    data.append("cloud-name", "drdbexqbf");
    fetch("https://api.cloudinary.com/v1_1/drdbexqbf/image/upload", {
      method: "Post",
      // headers: { "Content-type": "application/json" },
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
      <H1>Profile</H1>

      <div>
        <Form>
          <Input1
            onChange={(e) => {
              // setTweetMessage(e.target.value);
              setTextLength(280 - e.target.value.length);
              setStatusUpdate(e.target.value);
            }}
            placeholder="About you.."
            type="text"
          />
          <Input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <Button onClick={(e) => postDetails(e)}>submit</Button>
        </Form>
      </div>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column !important;

  margin: 20px;
`;

const Input = styled.input`
  width: 200px;
  border-radius: 15px;
  background-color: white;
  color: #be95c4;
  font-weight: 700px;
`;
const Input1 = styled.input`
  width: 200px;
  border-radius: 15px;
  background-color: white;
  color: #be95c4;
  font-weight: 700px;
  height: 80px;
  width: 500px;
`;
const Button = styled.button`
  width: 200px;
  border-radius: 15px;
  background-color: transparent;
  color: #be95c4;
  font-weight: 700px;
`;

const H1 = styled.h1`
  padding: 25px;
`;

export default Upload;

//FileReader.readAsDataURL()
// The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
