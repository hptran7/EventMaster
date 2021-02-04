import styled from "styled-components";
export const EventContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #fdf8f5;
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;

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
  h5 {
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const EventName = styled.div`
  display: flex;
  margin-bottom: 3px;
  p {
    color: black;
  }
`;
export const EventImage = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
export const EventDateTime = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
  input {
    @media screen and (max-width: 450px) {
      width: 100px;
    }
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
export const EventLocation = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
export const EventAddress = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }
`;
export const EventCity = styled.div`
  display: flex;
  margin-bottom: 3px;

  p {
    color: black;
  }

  input {
    @media screen and (max-width: 650px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;
