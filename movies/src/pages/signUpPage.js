import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let usernameRegEx = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;
    const validPassword = passwordRegEx.test(password);
    const validUsername = usernameRegEx.test(userName);
    if (!validPassword) {
      const message = "Password is too simple"
      alert(message);
    }
    if (!validUsername) {
      const message = "Invalid username."
      alert(message);
    }
    if (userName === "") {
      alert("Please enter username")
    }
    if (password !== passwordAgain) {
      const message = "Passwords do not match"
      alert(message);
    }
    if (validPassword && password === passwordAgain) {
      let registerStatus = await context.register(userName, password);
      setRegistered(true);
      registerStatus ? alert("Register suscess") : alert("Register failed");
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register a username and password to log in </p>
      <input value={userName} placeholder="username" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      {/* Login web form  */}
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;