import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "./Modal";

const detailButton = styled.button`
  padding: 10px 24px;
  background: #141414;
  color: #fff;
  border: none;
`;

function Events(props) {
  const [events, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventsDetail, setEventDetail] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let resultEvent = await axios.get("http://localhost:8080/");
    setEvent(resultEvent.data);
  };
  const handleEventDetail = (eventDetail) => {
    console.log(eventDetail);
  };

  const handleEventDelete = (id) => {
    deleteEvent(id);
  };

  const deleteEvent = async (id) => {
    await axios.post(`http://localhost:8080/delete-event/${id}`);
    fetchEvents();
  };
  const showModalonClick = (eventModal) => {
    setEventDetail(eventModal);
    setShowModal((prev) => !prev);
  };

  const eventItems = events.map((event) => {
    console.log(event);
    return (
      <li key={event.id}>
        {event.name} -
        <button onClick={() => showModalonClick(event.userEvent)}>
          Detail
        </button>
        <button onClick={() => handleEventDelete(event.id)}>Delete</button>
      </li>
    );
  });

  return (
    <>
      <ul>{eventItems}</ul>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        detail={eventsDetail}
        parentComponent="Event"
      />
    </>
  );
}

export default Events;
