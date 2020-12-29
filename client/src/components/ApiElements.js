import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 50px;
  }
`;

export const FormBox = styled.div`
  justify-content: center;
  margin-bottom: 20px;
  button {
    background-color: #266150;
    box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    height: 30px;
    margin-top: 5px;
    color: #fdf8f5;
  }
  input {
    box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    margin: 10px;
    width: 200px;
    height: 20px;
  }
`;
