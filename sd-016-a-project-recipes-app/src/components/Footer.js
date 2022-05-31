import React from 'react';
import { Link } from 'react-router-dom';
import Drink from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';
import ContainerFooter from '../style/footer';

function Footer() {
  return (
    <ContainerFooter data-testid="footer">
      <div className="links-footer">
        <Link to="/drinks">
          <img src={ Drink } alt="Drink" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explore">
          <img src={ Explore } alt="Explore" data-testid="explore-bottom-btn" />
        </Link>
        <Link to="/foods">
          <img src={ Food } alt="Food" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </ContainerFooter>
  );
}

export default Footer;
