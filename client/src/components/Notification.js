import React, { useState, useEffect } from "react";
import axios from "axios";

function Notification() {
  const [events, setEvent] = useState([]);
  useEffect(() => {
    fetchAlertEvent();
  }, []);
  const fetchAlertEvent = async () => {
    let resultEvent = await axios.get(
      "https://eventmaster-dc.herokuapp.com/alertEvent"
    );
    let alertEvent = resultEvent.data.filter((event) => {
      return event.userEvent.isupdated;
    });
    setEvent(alertEvent);
  };
  return (
    <>
      <h1>Notification</h1>
    </>
  );
}
export default Notification;
