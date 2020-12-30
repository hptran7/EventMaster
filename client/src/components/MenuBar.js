import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./Sidebar/SideBar";

function MenuBar(props) {
  useEffect(() => {
    console.log(props.isAuthent);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar toggle={toggle} isAuthent={props.isAuthent} />
      <SideBar isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export default MenuBar;
