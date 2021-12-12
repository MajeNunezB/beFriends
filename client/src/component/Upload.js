import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Upload = () => {
  const history = useHistory();
  const [image, setImage] = useState("");
  const { currentUser, status } = useContext(UsersContext);
  const [url, setUrl] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    if (url) {
      fetch(`/user/picture/${currentUser.email}`, {
        method: "post",
        header: { "content-type": "application/json" },
        body: JSON.stringify({ url: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url]);

  //function to send image to cloudinary and transform it into a URL
  const postDetails = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Mypicture");
    data.append("cloud-name", "drdbexqbf");
    console.log(image);
    fetch("https://api.cloudinary.com/v1_1/drdbexqbf/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
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
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Button type="submit">submit</Button>
      </Form>
      <Img src={url && url} />
    </div>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
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
