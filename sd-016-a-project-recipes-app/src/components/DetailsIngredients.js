import React from 'react';
import PropTypes from 'prop-types';
import ingredientsArray from '../hooks/ingredientsArray';

export default function DetailsIngredients(props) {
  const { details } = props;

  const arrayOfIngredients = ingredientsArray(details);

  return (
    <ul>
      {arrayOfIngredients.map((i, index) => (
        <li key={ i } data-testid={ `${index}-ingredient-name-and-measure` }>{i}</li>
      ))}
    </ul>
  );
}

DetailsIngredients.propTypes = {
  details: PropTypes.shape({
    strArea: PropTypes.string,
  }).isRequired,
};
