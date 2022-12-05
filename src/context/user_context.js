import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { user, loginWithRedirect, logout, isAuthenticated, isLoading } =
    useAuth0();
  const [myUser, setMyUser] = useState(null);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  useEffect(() => {
    setMyUser(
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : []
    );
  }, [user]);
  return (
    <UserContext.Provider
      value={{ myUser, loginWithRedirect, logout, isAuthenticated, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
