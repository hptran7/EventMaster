import styled from "styled-components";

export const EventContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
`;

export const Event = styled.li`
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.4);
  display: flex;
  border-radius: 8px;
  margin: 32px 0;
  list-style: none;
  background: white;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  } ;
`;

export const Eventleft = styled.div`
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

export const Eventdate = styled.div`
  font-size: 40px;
`;

export const EventMonthYear = styled.div`
  font-size: 16px;
  font-weight: normal;
  margin: 5px;
`;

export const EventRight = styled.div`
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

export const EventTiming = styled.div`
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

export const ButtonWrapper = styled.div`
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
export const UpdatedEvent = styled.div`
  color: Blue;
`;
export const CovidAlert = styled.div`
  color: red;
`;
