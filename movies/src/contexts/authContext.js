import React, { createContext, useContext, useEffect, useState } from "react";
import { login, signup, reset, getUser } from "../api";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(getUser(userName));
  }, [userName]);

  // Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const authenticateWithMsg = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      return `Welcome, ${username}.`
    } else {
      return "Wrong username or password."
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return result.code == 201 ? true : false;
  };

  const resetPassword = async (username, password) => {
    const result = await reset(username, password);
    console.log(result.code);
    return result.code == 201 ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        authenticateWithMsg,
        register,
        resetPassword,
        signout,
        userName,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
