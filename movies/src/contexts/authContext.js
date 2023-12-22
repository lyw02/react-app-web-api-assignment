import React, { createContext, useContext, useEffect, useState } from "react";
import { login, signup, reset, getUser } from "../api";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  // Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const resetPassword = async (username, password) => {
    const user = await getUser(username);
    const result = await reset(user._id, username, password);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  }

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        resetPassword,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
