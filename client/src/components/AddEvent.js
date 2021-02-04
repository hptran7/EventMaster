import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import history from "../utils/history";
import {
  EventContainer,
  EventName,
  EventImage,
  EventDateTime,
  EventLocation,
  EventAddress,
  EventCity,
} from "./AddEventElements";

//function Section
function AddEvent(props) {
  const [event, setEvent] = useState({});
  const [newEventId, setNewEventId] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = async () => {
    if (
      event.name &&
      event.date &&
      event.time &&
      event.location &&
      event.address &&
      event.city &&
      event.state &&
      event.postcode
    ) {
      await axios
        .post("https://eventmaster-dc.herokuapp.com/add-event", event)
        .then((result) => setNewEventId(result.data.success))
        .then(() => history.push("/"));
    } else {
      setMessage("!Please make sure all fields are filled in");
    }
  };

  return (
    <EventContainer>
      <h1>Add Event</h1>
      {message ? <h5>{message}</h5> : null}
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
