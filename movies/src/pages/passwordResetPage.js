import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const PasswordResetPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isReset, setIsReset] = useState(false);

  const reset = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.resetPassword(userName, password);
      setIsReset(true);
    }
  }

  if (isReset === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>Reset Password</h2>
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
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default PasswordResetPage;