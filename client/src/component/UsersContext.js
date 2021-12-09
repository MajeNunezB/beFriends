import React, { createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const [currentUser, setCurrentUser] = React.useState();

  // set user has currentuser or conect userAuth0 con mongo

  console.log(currentUser);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((user) => {
        setUserData(user.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  return (
    <UsersContext.Provider value={{ userData, status, setStatus, currentUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
