import React from "react";
import { connect } from "react-redux";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = (props) => {
  const handleLogout = (props) => {
    localStorage.removeItem("jsonwebtoken");
    // props.onLogOut();
  };
  return (
    <>
      <Nav>
        <Bars />
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
          {/* <NavBtnLink to="/login" onClick={() => handleLogout()}>
            Log out
          </NavBtnLink> */}
          <NavBtnLink to="/login">Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticate: state.isAuthenticate,
//   };
// };
// const mapDistpatchToProps = (dispath) => {
//   return {
//     onLogOut: () => dispath({ type: "Increment" }),
//   };
// };
export default Navbar;
