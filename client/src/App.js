import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Events from "./components/Events";

function App() {
  return (
    <div>
      <Events></Events>
    </div>
  );
}

export default App;
