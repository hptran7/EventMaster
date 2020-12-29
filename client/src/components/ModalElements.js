import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
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

export const ModalWrapper = styled.div`
  width: 70%;
  height: 80%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media screen and (min-width: 650px) and (max-width: 1200px) {
    width: 93%;
    height: 96%;
  }

  @media screen and (max-width: 650px) {
    width: 85%;
    height: 93%;
    /* grid-auto-flow: column; */
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;

  @media screen and (max-width: 580px) {
    height: 400px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  h2 {
    @media screen and (max-width: 535px) {
      font-size: 20px;
    }
  }
  p {
    margin: 0;
    color: black;
    @media screen and (max-width: 535px) {
      font-size: 15px;
    }
  }
  button {
    padding: 10px 24px;
    background: #266150;
    color: #fff;
    border-radius: 10px;
    margin: 5px;
    font-family: "Roboto", sans-serif;
    @media screen and (max-width: 535px) {
      color: white;
    }
  }
`;

export const Info = styled.div`
  height: 30px;
  overflow: auto;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 24px;
    background: #266150;
    color: #fff;
    /* border: none; */
    margin: 0.5 px;
    border-radius: 0.5px;
    @media screen and (max-width: 535px) {
      padding: 2px 6px;
      justify-content: center;
    }
  }
`;
export const AddFriendSection = styled.div`
  padding: 10px;
  button {
    padding: 5px 10px;
  }
  @media screen and (max-width: 580px) {
    padding: 0px;
    button {
      padding: 0px;
    }
  } ;
`;
