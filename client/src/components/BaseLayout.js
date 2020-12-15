import { React } from "react";

import "../css/index.css";
import Navbar from "./Navbar";

function BaseLayout(props) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="Content">{props.children}</div>
      <footer>footer</footer>
    </>
  );
}

export default BaseLayout;
