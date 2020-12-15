import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EventContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #fdf8f5;
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
  /* justify-content: center; */
  /* align-items: center; */
  input {
    width: 1000px;
    height: 30px;
  }
  h1 {
    color: #4f4846;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const EventName = styled.div`
  display: flex;
  margin-bottom: 3px;
  p {
    color: black;
  }
`;
const EventImage = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
const EventDateTime = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
const EventLocation = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
const EventAddress = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
const EventCity = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;

//function section
function EventUpdate(props) {
  const [eventNeedUpdatedId, setEventNeedUpdatedId] = useState(null);
  const [event, setEvent] = useState({});
  const [eventTarget, setEventTarger] = useState({});
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
    setEventTarger({
      ...eventTarget,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    handleOnLoad();
  }, []);
  const { eventid } = useParams();
  const handleOnClick = async () => {
    const url = `http://localhost:8080/update-event/${eventid}`;
    await axios.post(url, event).then(props.history.push("/"));
  };
  const handleOnLoad = async () => {
    const url = `http://localhost:8080/update-event/${eventid}`;
    const needUpdatedEvent = await axios.get(url);
    setEventTarger(needUpdatedEvent.data);
  };

  return (
    <EventContainer>
      <h1>Update Event</h1>
      <EventName>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Event name"
          name="name"
          onChange={handleChange}
          value={eventTarget.name}
        ></input>
      </EventName>
      <EventImage>
        <p>Image:</p>
        <input
          type="text"
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={eventTarget.image}
        ></input>
      </EventImage>
      <EventDateTime>
        <p>Date:</p>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="date"
          onChange={handleChange}
          value={eventTarget.date}
        ></input>
        <p>Time:</p>
        <input
          type="text"
          placeholder="HH:MM:SS"
          name="time"
          onChange={handleChange}
          value={eventTarget.time}
        ></input>
      </EventDateTime>
      <EventLocation>
        <p>Location:</p>
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          value={eventTarget.location}
        ></input>
      </EventLocation>
      <EventAddress>
        <p>Address:</p>
        <input
          type="text"
          placeholder="address"
          name="address"
          onChange={handleChange}
          value={eventTarget.address}
        ></input>
      </EventAddress>
      <EventCity>
        <p>City</p>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
          value={eventTarget.city}
        ></input>
        <p>State</p>
        <input
          type="text"
          placeholder="State"
          name="state"
          onChange={handleChange}
          value={eventTarget.state}
        ></input>
        <p>Postcode</p>
        <input
          type="text"
          placeholder="Postcode"
          name="postcode"
          onChange={handleChange}
          value={eventTarget.postcode}
        ></input>
      </EventCity>

      <button onClick={handleOnClick}>Submit</button>
    </EventContainer>
  );
}

export default EventUpdate;
