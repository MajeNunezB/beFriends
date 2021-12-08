import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UsersProvider } from "./component/UsersContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1m1ofvm9.us.auth0.com"
      clientId="jYf9iZk3UezvoGSbI9UTjvVrd1vbCEGr"
      redirectUri={window.location.origin}
    >
      <UsersProvider>
        <App />
      </UsersProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
