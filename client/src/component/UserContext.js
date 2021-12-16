import React, { Children } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
require("dotenv").config();

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const onRedirectCallBack = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallBack}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
    // document.getElementById("root")
  );
};

export default Auth0ProviderWithHistory;

//Auth0 the set is coming from https://auth0.com/docs/quickstart/spa/react
