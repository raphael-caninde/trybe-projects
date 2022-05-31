import styled from 'styled-components';

const ContainerFooter = styled.footer`
    background: #ff5003;
    bottom: 0;
    display: flex;
    flex-flow: column wrap;
    height: 8vh;
    left: 0;
    position: fixed;
    width: 100vw;

    .links-footer {
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 8vh;
    }

    .links-footer img {
      border-radius: 5px;
      width: auto;
    }
`;

export default ContainerFooter;
