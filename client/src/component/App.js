import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import Signup from "./Signup";

const App = () => {
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
              <Route path="/users/:userId">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/user/profile">
                <Profile />
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
