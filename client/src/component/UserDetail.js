import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import UsersContext from "./UsersContext";
import Friends from "./Friends";

const UserDetail = () => {
  const { usersData, status, setStatus, currentUser } =
    React.useContext(UsersContext);

  const [oneUser, setOneUser] = useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    fetch(`/api/getUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOneUser(data.data);
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  const addFriendRequest = () => {
    //params to get the current user and its friends
    const params = {
      currentUserId: currentUser._id,
      email: currentUser.email,
      friendId: oneUser["_id"],
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

  if (status === "loading") {
    return "loading...";
  }
  return (
    <div>
      {oneUser && (
        <>
          <Div1>
            <PicBack></PicBack>
            <PhotoDiv>
              <Img src={oneUser?.avatarUrl} />
            </PhotoDiv>
            {currentUser.friends.includes(oneUser?._id) ? (
              <>
                <Info>
                  <Name>{oneUser?.name}</Name>
                  <Email>{oneUser?.email}</Email>
                </Info>
                <Biodiv>
                  <Bio>{oneUser?.bio}</Bio>
                  <Bio>{`Hi!! My name is ${oneUser?.name}, I am ${oneUser?.age} old, my first language is ${oneUser?.language}, I am ${oneUser?.occupation} industry and my favorite hobby is ${oneUser?.hobbies} `}</Bio>
                </Biodiv>
              </>
            ) : (
              <>
                <div>
                  <Button onClick={addFriendRequest}>Add Friend</Button>
                </div>
              </>
            )}
            <Title>{`${oneUser.name} is friend with:`}</Title>

            {
              // Do not show friendList for other users, only show for current user

              <FriendList>
                {oneUser &&
                  oneUser.friends.map((friend) => {
                    return <Friends key={friend} friend={friend} />;
                  })}
              </FriendList>
            }
          </Div1>
        </>
      )}
    </div>
  );
};

const Div1 = styled.div`
  margin-top: 500px;
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 20 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 11pt;
  color: #aaa;
  display: flex;
  justify-content: center;
`;

const PicBack = styled.div`
  background: #eee;
  background-image: url("https://res.cloudinary.com/drdbexqbf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1639191148/samples/Mypicture/antoine-rault-IhWRrZx4-kk-unsplash_fc1mnm.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  height: 250px;
  @media (max-width: 800px) {
    height: 150px;
  }
`;

const PhotoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-top: -100px;
  border-radius: 100px;
  border: 4px solid #fff;
  background-size: cover;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Name = styled.h1`
  margin-top: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18pt;
  color: #777;
`;

const Email = styled.h1`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 11pt;
  color: #aaa;
`;

const Divider = styled.div`
  margin-right: 400px;
  margin-left: 400px;
  border-top: 2px solid #ededed;
`;

const Biodiv = styled.div`
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
`;

const Bio = styled.p`
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 11pt;
  font-family: "Open Sans";
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
`;

const FriendList = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`;

const Button = styled.button`
  align-items: center;
  margin-left: 470px;
  margin-top: 40px;
  margin-bottom: 60px;
  @extend .center-content;
  padding: 10px 30px;
  font-size: 30px;
  cursor: pointer;

  border-radius: 9px;
  border-bottom-left-radius: 0;

  background-color: var(--feedback-secondary-color);
  color: #fff;
  background-color: blue;
  opacity: 0.6;

  transition: all 0.3s;

  &:hover {
    border-radius: 0px;

    color: #60435f;
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

export default UserDetail;
