import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  .image {
    width: 30%;
    border-radius: 20%;
  }

  @media (max-width: 360px) {
    .image {
      width: 80%;
    }
  }

  .favorite {
    display: flex;
    flex-direction: column;
    color: #f45407;
    align-items: center;
    width: 80%;
  }

  .favorite div {
    display: flex;
    width: 100%;
  }

  .ingredients {
    background-color: ;
  }

  .instructions {
    background-color: #E6E6FA;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 90%;
  }

  .instructions h2 {
    text-align: center;
  }

  .video {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: 100vw;

  .cardFoods {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 280px;
    border: 1px solid red;
    width: 100vw;
    flex: none;
  }

  .card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    height: 49%;
  }

  .imgcard {
    width: 178px;
    border-radius: 20%;
  }
`;

export const ButtonStart = styled.button`
  position: fixed;
  bottom: 0;
  cursor: pointer;
  background-color: #f45407;
  color : white;
  height: 35px;
  width: 116px;
  border-radius: 6px;
  border: none;
`;
