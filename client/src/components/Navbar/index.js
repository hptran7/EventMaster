import React, { useState, useEffect } from "react";
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
  const [checkAuthen, setCheckAuthen] = useState(true);
  useEffect(() => {
    if (props.isAuthent) {
      setCheckAuthen(true);
    }
  }, []);
  const handleLogout = (props) => {
    localStorage.removeItem("jsonwebtoken");
    setCheckAuthen(false);
    history.push("/login");
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
