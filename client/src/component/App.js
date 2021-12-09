import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import AfterSignup from "./AfterSignup";

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
              <Route path="/users/:id">
                <Profile />
              </Route>
              <Route path="/signup">
                <AfterSignup />
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
