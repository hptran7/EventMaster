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
} from "./InvitationElements";

function Invitation(props) {
  const [events, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventsDetail, setEventDetail] = useState({});
  const [checkEventHost, SetCheckEventHost] = useState(false);
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
  const showModalonClick = (eventModal) => {
    setEventDetail(eventModal);
    setShowModal((prev) => !prev);
    SetCheckEventHost();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let resultEvents = await axios.get(
      "http://eventmaster-dc.herokuapp.com/invitation"
    );
    setEvent(resultEvents.data);
    console.log(resultEvents);
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
          </ButtonWrapper>
        </EventRight>
      </Event>
    );
  });
  return (
    <EventContainer>
      <h1>Invitation Request</h1>
      <ul>{eventItems}</ul>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        detail={eventsDetail}
        parentComponent="invitation"
        EventHostByUser={checkEventHost}
        history={props.history}
      />
    </EventContainer>
  );
}
export default Invitation;
