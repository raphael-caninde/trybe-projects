/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import RecipeContext from '../context/RecipeContext';
import InProgressIngredients from '../components/InProgressIngredients';
import local from '../services/handleLocal';

function DrinkInProgress(props) {
  const { enableFinish } = useContext(RecipeContext);
  const [details, setDetails] = useState([]);
  const { strDrink, strDrinkThumb, strAlcoholic } = details;
  const { match: { params: { recipeId } } } = props;

  useEffect(() => {
    requestAPI.getDrinks.infoById(recipeId)
      .then((info) => setDetails(info.drinks[0]));

    let actualInProgress = local.get.inProgressRecipes();
    if (!actualInProgress) actualInProgress = { cocktails: {}, meals: {} };
    local.set.inProgressRecipes(actualInProgress);
  }, []);

  const handleTag = () => {
    if (details.strTags === '' || !details.strTags) return [];
    return details.strTags.split(',');
  };

  const handleClick = () => {
    let doneRecipes = local.get.doneRecipes();
    if (!doneRecipes) doneRecipes = [];
    const d = new Date();
    const doneRecipe = ({
      id: details.idDrink,
      type: 'drink',
      nationality: details.strArea,
      category: '',
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
      doneDate: `${d.toLocaleDateString()}`,
      tags: handleTag(),
    });
    local.set.doneRecipes([...doneRecipes, doneRecipe]);
  };

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        width={ 200 }
      />
      <section>
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <span data-testid="recipe-category">{ strAlcoholic }</span>
        <ShareButton />
        { details.length !== 0 && <FavoriteButton
          details={ details }
          type="drink"
          idType="idDrink"
        /> }
      </section>
      <section>
        <h2>Ingredients</h2>
        { details.length !== 0
          && <InProgressIngredients
            recipeId={ recipeId }
            details={ details }
            type="cocktails"
          /> }
      </section>
      <section>
        <h2>Instructions</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>
      <Link to="/done-recipes">
        <button
          type="button"
          disabled={ !enableFinish }
          data-testid="finish-recipe-btn"
          onClick={ handleClick }
        >
          Finish Recipe
        </button>
      </Link>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkInProgress;
