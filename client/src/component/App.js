import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import EditProfile from "./EditProfile";
import UsersContext from "./UsersContext";
import UserDetail from "./UserDetail";

const App = () => {
  const { currentUser } = useContext(UsersContext);
  return (
    <>
      <OrangeBox>
        <BrowserRouter>
          <GlobalStyles />
          <Header />
          <BlueBox>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users/:id">
                <Profile />
              </Route>
              <Route path="/editProfile">
                <EditProfile />
              </Route>
              <Route path="/user/profile">
                <Profile />
                {/* {currentUser ? <Profile /> : <Redirect to="/" />} */}
              </Route>
              <Route path="/api/getUser/:id">
                <UserDetail />
              </Route>
            </Switch>
          </BlueBox>
        </BrowserRouter>
      </OrangeBox>
    </>
  );
};
const OrangeBox = styled.div`
  border: 1px solid red;
  max-width: 100vh auto;
`;
const BlueBox = styled.div`
  border: 1px solid blue;
`;

export default App;
