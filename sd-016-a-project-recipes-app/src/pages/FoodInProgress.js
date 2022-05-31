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

function FoodInProgress(props) {
  const { enableFinish } = useContext(RecipeContext);
  const [details, setDetails] = useState([]);
  const { strMeal, strMealThumb, strCategory } = details;
  const { match: { params: { recipeId } } } = props;

  useEffect(() => {
    requestAPI.getMeals.infoById(recipeId)
      .then((info) => setDetails(info.meals[0]));

    let actualInProgress = local.get.inProgressRecipes();
    if (!actualInProgress) actualInProgress = { cocktails: {}, meals: {} };
    local.set.inProgressRecipes(actualInProgress);
  }, []);

  const handleTag = () => {
    if (details.strTags === '') return [];
    return details.strTags.split(',');
  };

  const handleClick = () => {
    let doneRecipes = local.get.doneRecipes();
    if (!doneRecipes) doneRecipes = [];
    const d = new Date();
    const doneRecipe = ({
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: `${d.toLocaleDateString()}`,
      tags: handleTag(),
    });
    local.set.doneRecipes([...doneRecipes, doneRecipe]);
  };

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width={ 200 }
      />
      <section>
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <span data-testid="recipe-category">{ strCategory }</span>
        <ShareButton />
        { details.length !== 0 && <FavoriteButton
          details={ details }
          type="food"
          idType="idMeal"
        /> }
      </section>
      <section>
        <h2>Ingredients</h2>
        { details.length !== 0
          && <InProgressIngredients
            recipeId={ recipeId }
            details={ details }
            type="meals"
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

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodInProgress;
