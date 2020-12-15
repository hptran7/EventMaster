import { React } from "react";

import "../css/index.css";

function BaseLayout(props) {
  return (
    <div>
      <header>Header</header>
      <div className="Content">{props.children}</div>
      <footer>Footer</footer>
    </div>
  );
}

export default BaseLayout;
