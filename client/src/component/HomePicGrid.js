import React, { useState } from "react";
import UsersContext from "./UsersContext";
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const HomePicGrid = ({ user }) => {
  const { status, userData, setStatus } = useContext(UsersContext);
  const [profile, setProfile] = useState({});

  // const { id } = useParams();

  // React.useEffect(() => {
  //   setStatus("loading");
  //   fetch(`/api/users/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // setProfile(data.);
  //       setStatus("idle");
  //     })
  //     .catch((err) => {
  //       setStatus("error");
  //     });
  // }, []);

  if (status === "loading") {
    return "loading...";
  }
  return (
    <>
      <div key={user._id}>
        <Link to="/user/profile">
          <Img src={user && user.avatarUrl} />
        </Link>
        <Name>{user.name}</Name>
      </div>
    </>
  );
};

// const Link = styled(Link)`
//   text-decoration: none;
// `;

const Name = styled.span`
  padding-top: 20px;
  font-weight: bold;
  color: white;
  opacity: 0.7;
  margin-left: 250px;
`;

const Img = styled.img`
  display: grid;
  > .slide {
    grid-area: 1 / -1;
  }

  display: flex;
  justify-content: center;
  padding: 15px;
  align-items: center;
  height: 500px;
  width: 500px;
  color: #fff;
  margin: 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;

  @media screen and (min-width: 576px) {
    head {
      width: min(90%.70.5rem);
      min-width: 400px;
      margin: 15px;
    }
  }
`;

export default HomePicGrid;
