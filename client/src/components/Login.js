import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthenticationHeader } from "../utils/authenticate";
import history from "../utils/history";
import styled from "styled-components";
import { NavLink } from "../components/Navbar/NavbarElements";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    align-items: center;
    background-color: #f5cc72;
    box-shadow: 12px 12px 16px 0 rgba(252, 205, 50, 0.25),
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    height: 30px;
    width: 100px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  justify-self: center;
  justify-items: center;
  background-color: whitesmoke;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  margin-top: 100px;
  padding: 40px;
  border: gray solid;
  border-width: 1px;
  width: 700px;
`;
const LoginBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  justify-self: center;
  justify-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  p {
    color: black;
  }
  button {
    align-items: center;
    background-color: #f5cc72;
    box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    height: 30px;
    width: 80px;
  }
`;
const ErrorMessage = styled.div`
  p {
    font-size: 15px;
    color: black;
  }
`;

//Function section
function Login(props) {
  const reloeadHistory = useHistory();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const handelOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    await perFormLoginRequest();
  };

  const perFormLoginRequest = async () => {
    await axios
      .post("https://eventmaster-dc.herokuapp.com/login", user)
      .then(async (result) => {
        if (result.data.token) {
          const token = result.data.token;
          localStorage.setItem("jsonwebtoken", token);
          await setAuthenticationHeader(token);
          await props.onLogin();
          setMessage("");
          await history.push("/");
          reloeadHistory.go(0);
        } else {
          setMessage("Your username or password is not correct!");
        }
      });
  };
  return (
    <>
      <Container>
        <LoginContainer>
          <h2>Login</h2>
          <h4>Welcome to Event Master, please login to explore my site!</h4>
          <LoginBar>
            <p>Username:</p>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handelOnChange}
            ></input>
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handelOnChange}
            ></input>
            <button onClick={() => handleLogin()}>Login</button>
          </LoginBar>
          <ErrorMessage>{message ? <p>{message}</p> : null}</ErrorMessage>
          <NavLink to="/register" activeStyle>
            <button>Register</button>
          </NavLink>
        </LoginContainer>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: () => dispatch({ type: "ON_AUTH" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
