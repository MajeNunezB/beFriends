import React, { useState } from "react";
import base64EncodeImage from "react-native-base64";
import styled from "styled-components";

const Upload = () => {
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  //to get the previews image, with readAsDataURL method is used to read the context of the file
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //to be able to see the file, using FileReader() object
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewFile) return;
    uploadImage(previewSource);

    const reader = new FileReader();

    // reader.readAsDataURL(base64EncodeImage);
  };

  //   const handleSubmitFile = (e) => {
  //     if (window.FileReader) {
  //       let reader = new FileReader();
  //       if (previewFile && previewFile.type.match("image.*")) {
  //         reader.readAsDataURL(base64EncodeImage);
  //       } else {
  //         previewFile.attr("src", "");
  //       }
  //       reader.onloadend = function (e) {
  //         previewFile.attr("src", reader.result);
  //       };
  //     }
  //   };

  //to send the data to the backend
  const uploadImage = async (base64EncodeImage) => {
    console.log(base64EncodeImage);
    try {
      await fetch("api/upload", {
        method: "Post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ data: base64EncodeImage }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Reder the file input and the submit button to update the picture
  return (
    <div>
      <H1>Profile</H1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="imagen"
          onChange={(e) => {
            handleFile(e);
          }}
          value={fileInput}
        />
        <button type="submit">submit</button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="image"
          style={{ width: "300px", height: "300px" }}
        />
      )}
    </div>
  );
};

const H1 = styled.h1`
  padding: 15px;
`;
export default Upload;

//FileReader.readAsDataURL()
// The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
