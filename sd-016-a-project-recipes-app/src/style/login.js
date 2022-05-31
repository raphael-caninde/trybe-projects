import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f45407;
`;

export const Form = styled.form`
  background: #fff;
  max-width: 350px;
  min-height: 30vh;
  padding: 2rem;
  box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  input {
    width: 100%;
    cursor: text;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f45407;
    outline: 0;
    margin-top: 10px;
    font-size: 20px;
  }

  button {
    cursor: pointer;
    margin-top: 20px;
    background-color: #f45407;
    color : white;
    height: 35px;
    width: 116px;
    border-radius: 7px;
    border: none;
    text-align: center;
    transition: 1s;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
