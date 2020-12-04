import React from 'react'
import styled from 'styled-components'
import {MdClose} from 'react-icons/md'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  top:0;
  left:0;
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
    color:black
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const info = styled.div`
  height:30px;
  overflow:auto;
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


function Modal(props){

    return (
        <>
          {props.showModal ? (
            <Background>
                <ModalWrapper showModal={props.showModal}>
                  <ModalImg src={props.detail.img} alt='camera' />
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
                    <button>Join Now</button>
                  </ModalContent>
                  <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => props.setShowModal(prev => !prev)}
                  />
                </ModalWrapper>
            </Background>
          ) : null}
        </>
      );
   
    
}
export default Modal