/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import local from '../services/handleLocal';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton(props) {
  const { details, type, idType } = props;
  const [favorite, setFavorite] = useState(false);

  let actualLocal = local.get.favoriteRecipes();
  if (!actualLocal) actualLocal = [];

  useEffect(() => {
    if (actualLocal
      .some((eachFav) => eachFav.id === details[idType])) setFavorite(true);
  }, []);

  const addOrRemoveFromLocal = (objectToLocal) => {
    if (favorite) {
      actualLocal = actualLocal.filter((eachFav) => eachFav.id !== objectToLocal.id);
      setFavorite(false);
    } else {
      actualLocal.push(objectToLocal);
      setFavorite(true);
    }
    local.set.favoriteRecipes(actualLocal);
  };

  const handleClick = () => {
    let objectToLocal = {};
    if (type === 'food') {
      objectToLocal = {
        id: details.idMeal,
        type,
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
      };
    }
    if (type === 'drink') {
      objectToLocal = {
        id: details.idDrink,
        type,
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
      };
    }
    addOrRemoveFromLocal(objectToLocal);
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="FavoriteButton"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  details: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  idType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
