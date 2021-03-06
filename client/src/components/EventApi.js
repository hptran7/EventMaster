import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/eventapi.css";
import Modal from "./Modal";
import { Container, FormBox } from "./ApiElements";

function EventApi() {
  const [showModal, setShowModal] = useState(false);
  const [eventsDetail, setEventDetail] = useState({});
  const [keyWord, setKeyWord] = useState("");
  const [message, setMessage] = useState("");

  const showModalonClick = (eventModal) => {
    setEventDetail(eventModal);
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    fetchAPIEvent();
  }, []);
  const [events, setEvents] = useState([]);
  const fetchAPIEvent = async (keyword = "music") => {
    const instance = axios.create();
    if (instance.defaults) {
      await delete instance.defaults.header;
      const events = await instance.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=16&apikey=HJiw8glKSajGdYC33wEs8KFwVZAIiivY&keyword=${keyword}&countryCode=US`,
        {
          transformRequest: (data, headers) => {
            delete headers.common["Authorization"];
          },
        }
      );
      if (events.data._embedded) {
        setEvents(events.data._embedded.events);
        setMessage("");
      } else {
        setEvents([]);
        setMessage(
          "This Event is not existed, please search for something else"
        );
      }
    } else {
      setEvents([]);
      setMessage("This Event is not existed, please search for something else");
    }
  };
  const keyWordSearchOnchange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearchAPI = () => {
    fetchAPIEvent(keyWord);
  };

  const eventItem = events.map((event, index) => {
    let eventModal = {
      name: event.name,
      image: event.images[2].url,
      date: event.dates.start.localDate,
      time: event.dates.start.localTime,
      info: event.info,
      location: event._embedded.venues[0].name,
      address: event._embedded.venues[0].address.line1,
      city: event._embedded.venues[0].city.name,
      state: event._embedded.venues[0].state.stateCode,
      postcode: event._embedded.venues[0].postalCode,
    };
    return (
      <li key={index}>
        <div>
          <div className="card" key={index}>
            <div className="projectImageWrapper">
              <img className="screenshot" src={event.images[2].url} />
            </div>
            <div className="cardBody">
              <p>{event.name}</p>
              <button
                className="btn"
                onClick={() => showModalonClick(eventModal)}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <Container>
      <h1>Search Event</h1>
      <FormBox>
        <input
          type="text"
          placeholder="PLease enter your event name"
          onChange={keyWordSearchOnchange}
        />
        <button onClick={() => handleSearchAPI()}>Search</button>
        {message ? <div>{message}</div> : null}
      </FormBox>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        detail={eventsDetail}
        parentComponent="EventApi"
      />

      <div className="grid-api">{eventItem}</div>
    </Container>
  );
}

export default EventApi;
