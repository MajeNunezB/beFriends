import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth0();

  // set user data to currentUser to fetch the info of one user
  useEffect(() => {
    if (user) {
      fetch(`/api/userEmail/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setCurrentUser(data.data);

          setStatus("idle");
        })
        .catch((err) => {
          setStatus("error");
        });
    }
  }, [user]);

  //fetching all users data
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
    <UsersContext.Provider
      value={{ userData, status, setStatus, currentUser, setCurrentUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
