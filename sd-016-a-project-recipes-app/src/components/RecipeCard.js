import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardFoods from '../style/cardFood';

function RecipeCard(props) {
  const { name, img, index, id, type, category } = props;

  return (
    <CardFoods data-testid={ `${index}-recipe-card` }>
      <Link className="link" to={ `/${type}/${id}` }>
        <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
        <span data-testid="recipe-category">{ category }</span>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      </Link>
    </CardFoods>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeCard;
