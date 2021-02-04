import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../image/logo4.png";
import history from "../../utils/history";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Logo,
} from "./NavbarElements";

const Navbar = (props) => {
  const reloadHistory = useHistory();
  const [checkAuthen, setCheckAuthen] = useState(false);
  useEffect(() => {
    if (props.isAuthent) {
      setCheckAuthen(true);
    }
  }, []);
  const handleLogout = async (props) => {
    localStorage.removeItem("jsonwebtoken");
    setCheckAuthen(false);
    await history.push("/login");
    reloadHistory.go(0);
  };
  return (
    <>
      <Nav>
        <Bars onClick={props.toggle} />
        <NavLink to="/">
          {/* <img src={logo} alt="logo" /> */}
          <Logo src={logo} />
        </NavLink>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Main Page
          </NavLink>
          <NavLink to="/event-api" activeStyle>
            Find Event
          </NavLink>
          <NavLink to="/add-event" activeStyle>
            Add Event
          </NavLink>
          <NavLink to="/invitation" activeStyle>
            Invitation Request
          </NavLink>
          {checkAuthen ? (
            <NavBtnLink to="/login" onClick={() => handleLogout()}>
              Log out
            </NavBtnLink>
          ) : null}
          {!checkAuthen ? <NavBtnLink to="/login">Sign In</NavBtnLink> : null}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
