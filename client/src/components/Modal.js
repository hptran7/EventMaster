import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Axios from "axios";

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
    background: #141414;
    color: #fff;
    border-radius: 10px;
  }
`;

const info = styled.div`
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
const buttonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 24px;
    background: #141414;
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
  const handleAddFriendOnChange = (e) => {
    setuserRequest({
      [e.target.name]: e.target.value,
    });
  };
  const handleSendRequestClick = () => {
    console.log(userRequest);
  };
  const joinEvent = async () => {
    Axios.post("http://localhost:8080/add-event", props.detail);
  };
  const inviteFriend = async (id) => {
    console.log(id);
    setshowAddFriend((prev) => !prev);
  };
  const updateEvent = async (id) => {
    console.log(id);
  };
  const covidAlert = async (id) => {
    await Axios.post(`http://localhost:8080/update-event-covid/${id}`);
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
                <info>{props.detail.info}</info>
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
                <info>{props.detail.info}</info>
                <buttonWrapper>
                  <button onClick={() => inviteFriend(props.detail.id)}>
                    Invite Friend
                  </button>
                  <button onClick={() => updateEvent(props.detail.id)}>
                    Update
                  </button>
                  <button onClick={() => covidAlert(props.detail.id)}>
                    Covid-19 Alert
                  </button>
                </buttonWrapper>
                {showAddFriend ? (
                  <AddFriendSection>
                    <input
                      type="text"
                      onChange={handleAddFriendOnChange}
                      name="user"
                    />
                    <button onClick={() => handleSendRequestClick()}>
                      Send Request
                    </button>
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
  }
}
export default Modal;
