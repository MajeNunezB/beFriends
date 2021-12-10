import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./component/GlobalStyles";
import Login from "./component/Login";
import Home from "./component/Home";
import Profile from "./component/Profile";
import Header from "./component/Header";
import Signup from "./component/Signup";

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
