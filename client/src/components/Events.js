import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";

function Events(props) {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let resultEvent = await axios.get("http://localhost:8080/");
    setEvent(resultEvent.data);
  };

  const handleEventDelete = (id) => {
    deleteEvent(id);
  };

  const deleteEvent = async (id) => {
    await axios.post(`http://localhost:8080/delete-event/${id}`);
    fetchEvents();
  };

  const eventItems = events.map((event) => {
    return (
      <li key={event.id}>
        {event.name} -{" "}
        <button onClick={() => handleEventDelete(event.id)}>Delete</button>
      </li>
    );
  });

  return <ul>{eventItems}</ul>;
}

export default Events;
