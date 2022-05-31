import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 10px 0;
  width: 100%;

  .buttons {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 1rem;
    height: 30px;
    width: 70px;
    text-align: center;
    margin-bottom: 10px;
  }
`;

export default Nav;
