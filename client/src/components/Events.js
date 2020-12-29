import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import timelogo from "../image/time.png";

import {
  EventContainer,
  Event,
  Eventleft,
  Eventdate,
  EventMonthYear,
  EventRight,
  EventTiming,
  ButtonWrapper,
  UpdatedEvent,
  CovidAlert,
} from "./EventPageStyles";

function Events(props) {
  const [events, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventsDetail, setEventDetail] = useState({});
  const [checkEventHost, SetCheckEventHost] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 18);
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    let resultEvent = await axios.get("https://eventmaster-dc.herokuapp.com/");
    if (!resultEvent.data.error) {
      const sortedEvent = await resultEvent.data.sort((a, b) => {
        return (
          parseInt(a.userEvent.date.split("-").join("")) -
          parseInt(b.userEvent.date.split("-").join(""))
        );
      });
      const filterEvent = await sortedEvent.filter((event) => {
        return (
          parseInt(event.userEvent.date.split("-").join("")) >=
          parseInt(date.split("-").join(""))
        );
      });
      setEvent(filterEvent);
    }
  };

  const showMonth = (month) => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
    }
  };
  const handleEventDetail = (eventDetail) => {
    console.log(eventDetail);
  };

  const handleEventDelete = (id) => {
    deleteEvent(id);
  };

  const deleteEvent = async (id) => {
    await axios.post(`https://eventmaster-dc.herokuapp.com/delete-event/${id}`);
    fetchEvents();
  };
  const showModalonClick = (eventModal) => {
    setEventDetail(eventModal);
    setShowModal((prev) => !prev);
    SetCheckEventHost(
      checkHost(eventModal.userId, eventModal.userEvent.hostBy)
    );
  };
  const checkHost = (userId, hostId) => {
    if (userId == hostId) {
      return true;
    } else {
      return false;
    }
  };

  const eventItems = events.map((event) => {
    const year = event.userEvent.date.slice(0, -6);
    const month = showMonth(event.userEvent.date.slice(5, -3));
    return (
      <Event key={event.id}>
        <Eventleft>
          <Eventdate>
            {event.userEvent.date[8] + event.userEvent.date[9]}
          </Eventdate>
          <EventMonthYear>
            {month}-{year}
          </EventMonthYear>
        </Eventleft>
        <EventRight>
          <h3>{event.userEvent.name}</h3>
          <p>
            Location:{event.userEvent.address} {event.userEvent.city}{" "}
            {event.userEvent.state} {event.userEvent.postcode}{" "}
          </p>
          {event.userEvent.isupdated ? (
            <UpdatedEvent>This Event has been updated by the Host</UpdatedEvent>
          ) : null}
          {event.userEvent.covidStatus ? (
            <CovidAlert>Covid Alert!</CovidAlert>
          ) : null}
          <EventTiming>
            <img src={timelogo} />
            {event.userEvent.time}
          </EventTiming>
          <ButtonWrapper>
            <button onClick={() => showModalonClick(event)}>Detail</button>
            <button onClick={() => handleEventDelete(event.id)}>Delete</button>
          </ButtonWrapper>
        </EventRight>
      </Event>
    );
  });

  return (
    <EventContainer>
      <h1>Event</h1>
      <ul>{eventItems}</ul>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        detail={eventsDetail}
        parentComponent="Event"
        EventHostByUser={checkEventHost}
        history={props.history}
      />
    </EventContainer>
  );
}

export default Events;
