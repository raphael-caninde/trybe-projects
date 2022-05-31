import styled from 'styled-components';

const ContainerHeader = styled.header`
  align-items: center;
  background-color: #ff5003;
  display: flex;
  height: 15vh;
  justify-content: space-evenly;
  width: 100%;

  .title {
    color: white;
  }

  .img-profile {
    background-color: white;
    border-radius: 10px;
    width: 3rem;
  }
`;

export default ContainerHeader;
