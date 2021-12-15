import React, { useState } from "react";
import UsersContext from "./UsersContext";
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const HomePicGrid = ({ user, id }) => {
  const { status, usersData, currentUser } = useContext(UsersContext);
  const [profile, setProfile] = useState({});

  //to get the user info detailed
  let history = useHistory();
  const handleDetail = () => {
    history.push(`/api/getUser/${id}`);
  };

  if (status === "loading") {
    return "loading...";
  }

  //Friend request Button
  const addFriendRequest = () => {
    //params to get the current user and its friends
    const params = {
      currentUserId: currentUser._id,
      email: currentUser.email,
      friendId: user["_id"],
    };

    //making the  query: email=rony@gmail.com&friendId=5  ---> encodeUriComponent helps to read @
    const query = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    fetch(`/api/friends/add?${query}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div key={user._id}>
        <ProfileDiv
          onClick={() => {
            handleDetail();
          }}
        >
          {user.avatarUrl ? (
            <Img src={user && user.avatarUrl} />
          ) : (
            <Img src="https://res.cloudinary.com/drdbexqbf/image/upload/v1639065686/samples/Mypicture/no-user-image-icon-27_iukhui.png" />
          )}

          <Name>{user.name}</Name>

          <Div>{user.bio}</Div>
        </ProfileDiv>
        <div>
          <Button onClick={addFriendRequest}>Add Friend</Button>
        </div>
      </div>
    </>
  );
};

const Name = styled.span`
  padding-top: 20px;
  font-weight: bold;
  color: white;
  opacity: 0.7;
  /* margin-left: 250px; */
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
      min-width: 100px;
      margin: 15px;
    }
  }
`;

const Div = styled.p`
  color: white;
  margin-top: 10px;
  position: relative;
  text-align: center;
  width: 500px;
  /* height: 500px; */
  padding: 15px;
  left: 15px;
  /* line-height: 200px; */
  opacity: 0.6;
  @media screen and (max-width: 990px) {
    font-size: 12px;
  }
`;

const ProfileDiv = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  align-items: center;
  margin-left: 180px;
  @extend .center-content;
  padding: 10px 30px;
  font-size: 24px;
  cursor: pointer;

  border-radius: 9px;
  border-bottom-left-radius: 0;

  background-color: var(--feedback-secondary-color);
  color: #fff;
  opacity: 0.6;

  transition: all 0.3s;

  &:hover {
    border-radius: 0px;

    color: #fff;
    opacity: 0.6;
    background-color: var(--background-color);
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffacac' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: animatedBackground 5s linear infinite alternate;
  }

  @keyframes animatedBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 0;
    }
  }
`;

export default HomePicGrid;
