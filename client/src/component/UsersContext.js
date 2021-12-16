import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [usersData, setUsersData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [refresh, setRefresh] = useState(false);

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
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  //fetching all users data based on matching interests
  useEffect(() => {
    let url = "";
    if (isAuthenticated) {
      url = `/api/users?email=${user?.email}`;
    } else {
      url = `/api/users`;
    }
    fetch(url) //
      .then((res) => res.json())
      .then((user) => {
        setUsersData(user.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [user]);
  return (
    <UsersContext.Provider
      value={{
        usersData,
        status,
        setStatus,
        currentUser,
        setCurrentUser,
        refresh,
        setRefresh,
        isAuthenticated,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
