import styled from 'styled-components';

const CardFoods = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin-bottom: 3.7rem;

  .link {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }

  img {
    border-radius: 20%;
    max-width: 70%;
  }

  h3 {
    color: #f45407;
    text-align: center;
  }
`;

export default CardFoods;
