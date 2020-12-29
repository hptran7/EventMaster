import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./Sidebar/SideBar";

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar toggle={toggle} />
      <SideBar isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export default MenuBar;
