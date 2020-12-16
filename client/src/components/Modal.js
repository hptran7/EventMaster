import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Axios from "axios";
import history from "../utils/history";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 1000px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin: 0;
    color: black;
  }
  button {
    padding: 10px 24px;
    background: #266150;
    color: #fff;
    border-radius: 10px;
    margin: 5px;
    font-family: "Roboto", sans-serif;
  }
`;

const Info = styled.div`
  height: 30px;
  overflow: auto;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 24px;
    background: #266150;
    color: #fff;
    /* border: none; */
    margin: 0.5 px;
    border-radius: 0.5px;
  }
`;
const AddFriendSection = styled.div`
  padding: 10px;
  button {
    padding: 5px 10px;
  }
`;

function Modal(props) {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [userRequest, setuserRequest] = useState({});
  const [invitationResult, setInvitationResult] = useState("");

  const handleAddFriendOnChange = (e) => {
    setuserRequest({
      ...userRequest,
      [e.target.name]: e.target.value,
    });
  };
  const handleSendRequestClick = async (id) => {
    console.log(userRequest);
    await Axios.post(
      "https://eventmaster-dc.herokuapp.com/invite-friend",
      userRequest
    ).then((result) => {
      if (result.data.success) {
        setInvitationResult("Your invitation has been sent");
      } else {
        setInvitationResult("Please enter correct username");
      }
    });
  };

  const joinEvent = async () => {
    await Axios.post(
      "https://eventmaster-dc.herokuapp.com/add-event",
      props.detail
    );
  };

  const acceptRequest = async (id) => {
    await Axios.post(
      "https://eventmaster-dc.herokuapp.com/add-event",
      props.detail.userEvent
    );
    denyRequest(id);
  };
  const denyRequest = async (id) => {
    Axios.post(`http://eventmaster-dc.herokuapp.com/update-invitation/${id}`);
    history.push("/");
  };
  const inviteFriend = async (id) => {
    await setuserRequest({});
    setInvitationResult("");
    setuserRequest({
      eventId: id,
    });
    setshowAddFriend((prev) => !prev);
  };
  const updateEvent = async (id) => {
    history.push(`/update-event/${id}`);
  };
  const covidAlert = async (id) => {
    await Axios.post(
      `https://eventmaster-dc.herokuapp.com/update-event-covid/${id}`
    ).then((result) => {
      if (result.data.success) {
        alert(
          "Don't worry! Your guests have been alerted about the Covid situation "
        );
      }
    });
  };
  if (props.parentComponent == "EventApi") {
    return (
      <div>
        {props.showModal ? (
          <Background>
            <ModalWrapper showModal={props.showModal}>
              <ModalImg src={props.detail.image} alt="camera" />
              <ModalContent>
                <h2>{props.detail.name}</h2>
                <p>{props.detail.location}</p>
                <p>{props.detail.time}</p>
                <p>{props.detail.date}</p>
                <p>{props.detail.location}</p>
                <p>{props.detail.address}</p>
                <p>{props.detail.city}</p>
                <p>{props.detail.state}</p>
                <Info>{props.detail.info}</Info>
                <button onClick={() => joinEvent()}>Join Now</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => {
                  props.setShowModal((prev) => !prev);
                }}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </div>
    );
  } else if (props.parentComponent == "Event") {
    return (
      <div>
        {props.showModal ? (
          <Background>
            <ModalWrapper showModal={props.showModal}>
              <ModalImg src={props.detail.userEvent.image} alt="camera" />
              <ModalContent>
                <h2>{props.detail.userEvent.name}</h2>
                <p>{props.detail.userEvent.location}</p>
                <p>{props.detail.userEvent.time}</p>
                <p>{props.detail.userEvent.date}</p>
                <p>{props.detail.userEvent.location}</p>
                <p>{props.detail.userEvent.address}</p>
                <p>{props.detail.userEvent.city}</p>
                <p>
                  {props.detail.userEvent.state},{" "}
                  {props.detail.userEvent.postcode}
                </p>
                <Info>{props.detail.userEvent.info}</Info>
                <ButtonWrapper>
                  <button onClick={() => inviteFriend(props.detail.id)}>
                    Invite Friend
                  </button>
                  {props.EventHostByUser ? (
                    <div>
                      <button onClick={() => updateEvent(props.detail.eventId)}>
                        Update
                      </button>
                      <button onClick={() => covidAlert(props.detail.id)}>
                        Covid-19 Alert
                      </button>
                    </div>
                  ) : null}
                </ButtonWrapper>
                {showAddFriend ? (
                  <AddFriendSection>
                    <input
                      type="text"
                      onChange={handleAddFriendOnChange}
                      name="invitedUser"
                    />
                    <button
                      onClick={() => handleSendRequestClick(props.detail.id)}
                    >
                      Send Request
                    </button>
                    <div>{invitationResult}</div>
                  </AddFriendSection>
                ) : null}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => {
                  props.setShowModal((prev) => !prev);
                  setshowAddFriend(false);
                }}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </div>
    );
  } else if (props.parentComponent == "invitation") {
    return (
      <div>
        {props.showModal ? (
          <Background>
            <ModalWrapper showModal={props.showModal}>
              <ModalImg src={props.detail.userEvent.image} alt="camera" />
              <ModalContent>
                <h2>{props.detail.userEvent.name}</h2>
                <p>{props.detail.userEvent.location}</p>
                <p>{props.detail.userEvent.time}</p>
                <p>{props.detail.userEvent.date}</p>
                <p>{props.detail.userEvent.location}</p>
                <p>{props.detail.userEvent.address}</p>
                <p>{props.detail.userEvent.city}</p>
                <p>{props.detail.userEvent.state}</p>
                <Info>{props.detail.userEvent.info}</Info>
                <button onClick={() => acceptRequest(props.detail.id)}>
                  Join Now
                </button>
                <button onClick={() => denyRequest(props.detail.id)}>
                  Deny
                </button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => {
                  props.setShowModal((prev) => !prev);
                }}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </div>
    );
  }
}
export default Modal;
