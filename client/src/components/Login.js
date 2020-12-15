import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthenticationHeader } from "../utils/authenticate";
import history from "../utils/history";

function Login(props) {
  const [user, setUser] = useState({});

  const handelOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    await perFormLoginRequest();
    history.push("/");
  };

  const perFormLoginRequest = async () => {
    await axios.post("http://localhost:8080/login", user).then((result) => {
      const token = result.data.token;
      localStorage.setItem("jsonwebtoken", token);
      setAuthenticationHeader(token);
    });
  };
  return (
    <>
      <div>Login Page</div>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handelOnChange}
      ></input>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handelOnChange}
      ></input>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
