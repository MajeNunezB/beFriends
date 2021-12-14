import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
// import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./component/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { UsersProvider } from "./component/UsersContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <UsersProvider>
          <App />
        </UsersProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);
