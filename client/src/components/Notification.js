import React, { useState, useEffect } from "react";
import axios from "axios";

function Notification() {
  const [events, setEvent] = useState([]);
  useEffect(() => {
    fetchAlertEvent();
  }, []);
  const fetchAlertEvent = async () => {
    console.log("good");
  };
  return (
    <>
      <h1>Notification</h1>
    </>
  );
}
export default Notification;
