import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import history from "../utils/history";

//Styled component Section
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

//function Section
function AddEvent(props) {
  const [event, setEvent] = useState({});
  const [newEventId, setNewEventId] = useState(null);
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = async () => {
    await axios
      .post("https://eventmaster-dc.herokuapp.com/add-event", event)
      .then((result) => setNewEventId(result.data.success))
      .then(history.push("/"));
  };

  return (
    <EventContainer>
      <h1>Add Event</h1>
      <EventName>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Event name"
          name="name"
          onChange={handleChange}
        ></input>
      </EventName>
      <EventImage>
        <p>Image:</p>
        <input
          type="text"
          placeholder="Image"
          name="image"
          onChange={handleChange}
        ></input>
      </EventImage>
      <EventDateTime>
        <p>Date:</p>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="date"
          onChange={handleChange}
        ></input>
        <p>Time:</p>
        <input
          type="text"
          placeholder="HH:MM:SS"
          name="time"
          onChange={handleChange}
        ></input>
      </EventDateTime>
      <EventLocation>
        <p>Location:</p>
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
        ></input>
      </EventLocation>
      <EventAddress>
        <p>Address:</p>
        <input
          type="text"
          placeholder="address"
          name="address"
          onChange={handleChange}
        ></input>
      </EventAddress>
      <EventCity>
        <p>City</p>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        ></input>
        <p>State</p>
        <input
          type="text"
          placeholder="State"
          name="state"
          onChange={handleChange}
        ></input>
        <p>Postcode</p>
        <input
          type="text"
          placeholder="Postcode"
          name="postcode"
          onChange={handleChange}
        ></input>
      </EventCity>

      <button onClick={handleOnClick}>Submit</button>
    </EventContainer>
  );
}

const mapStateToProps = (state) => {};

export default connect()(AddEvent);
