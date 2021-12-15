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
  console.log(id);

  React.useEffect(() => {
    fetch(`/api/getUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOneUser(data.data);
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  console.log(oneUser);

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
            <Info>
              <Name>{oneUser?.name}</Name>
              <Email>{oneUser?.email}</Email>
            </Info>
            <Biodiv>
              <Bio>{oneUser?.bio}</Bio>
              <Bio>{`I am ${oneUser?.age} old, I speake ${oneUser?.language}, I work in ${oneUser?.occupation} and my hobbies are ...`}</Bio>
            </Biodiv>
            <Title>{`${oneUser.name} is friend with:`}</Title>
            <FriendList>
              {currentUser &&
                currentUser.friends.map((friend) => {
                  return <Friends key={friend} friend={friend} />;
                })}
            </FriendList>
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
`;

export default UserDetail;
