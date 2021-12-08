import React, { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const [currentUser, setCurrentUser] = React.useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // set user has currentuser or conect userAuth0 con mongo

  React.useEffect(() => {
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

  console.log(userData);

  return (
    <UsersContext.Provider value={{ userData, status, setStatus }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
