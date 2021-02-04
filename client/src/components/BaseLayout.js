import { React } from "react";
import { connect } from "react-redux";

import "../css/index.css";
import MenuBar from "./MenuBar";
// import Navbar from "./Navbar";

function BaseLayout(props) {
  return (
    <>
      <header>
        <MenuBar isAuthent={props.isAuthenticate} />
      </header>
      <div className="Content">{props.children}</div>
      <footer>
        <p className="footer">Event Master</p>
      </footer>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.isAuthenticated,
  };
};
export default connect(mapStateToProps)(BaseLayout);
