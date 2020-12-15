import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "./Modal";
import timelogo from "../image/time.png";

const EventContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Event = styled.li`
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.4);
  display: flex;
  border-radius: 8px;
  margin: 32px 0;
  list-style: none;
  background: white;
`;

const Eventleft = styled.div`
  background: #222;
  min-width: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eee;
  padding: 68px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px 0 0 8px;
  flex-direction: column;
`;

const Eventdate = styled.div`
  font-size: 40px;
`;

const EventMonthYear = styled.div`
  font-size: 16px;
  font-weight: normal;
  margin: 5px;
`;

const EventRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;

  h3 {
    font-size: 24px;
    margin: 24px 0 10px 0;
    color: #4f4846;
    text-transform: uppercase;
  }
  p {
    color: black;
  }
`;

const EventTiming = styled.div`
  background: #fff8ba;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 8px;
  border-radius: 16px;
  margin: 24px 0;
  font-size: 14px;
  img {
    height: 20px;
    padding-right: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  button {
    background: #266150;
    color: #fdf8f5;
    margin: 4px;
    padding: 7px 15px;
    border-radius: 10px;
    font-family: "Roboto", sans-serif;
  }
  button:hover {
    transition: all 0.2s ease-in-out;
    background: #3d9c80;
    cursor: pointer;
  }
`;

//function Section

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
    let resultEvent = await axios.get("http://localhost:8080/");
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
    console.log(filterEvent);
    setEvent(filterEvent);
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
    await axios.post(`http://localhost:8080/delete-event/${id}`);
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
