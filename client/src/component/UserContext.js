import React, { Children } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-1m1ofvm9.us.auth0.com";
  const clientId = "jYf9iZk3UezvoGSbI9UTjvVrd1vbCEGr";

  const history = useHistory();

  const onRedirectCallBack = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="dev-1m1ofvm9.us.auth0.com"
      clientId="jYf9iZk3UezvoGSbI9UTjvVrd1vbCEGr"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
    // document.getElementById("root")
  );
};

export default Auth0ProviderWithHistory;
