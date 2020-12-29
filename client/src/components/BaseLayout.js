import { React } from "react";

import "../css/index.css";
import MenuBar from "./MenuBar";
// import Navbar from "./Navbar";

function BaseLayout(props) {
  return (
    <>
      <header>
        <MenuBar />
      </header>
      <div className="Content">{props.children}</div>
      <footer>footer</footer>
    </>
  );
}

export default BaseLayout;
