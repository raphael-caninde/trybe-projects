/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import RecipeCard from '../components/RecipeCard';
import DetailsIngredients from '../components/DetailsIngredients';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { ButtonStart } from '../style/foodDetails';

function DrinkDetails(props) {
  const [details, setDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { match: { params: { recipeId } } } = props;
  const { strDrink, strDrinkThumb, strAlcoholic } = details;

  useEffect(() => {
    requestAPI.getDrinks.infoById(recipeId)
      .then((info) => setDetails(info.drinks[0]));
    requestAPI.getMeals.byNameOrFirst12()
      .then((info) => setRecommendations((info.meals)));
  }, []);

  const RECOMMENDATION_LIMIT = 6;

  return (
    <main>
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
        { details.length !== 0 && <DetailsIngredients details={ details } /> }
      </section>
      <section>
        <h2>Instructions</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>
      <section>
        <h2>Recommended</h2>
        {recommendations && recommendations
          .filter((_, i) => i < RECOMMENDATION_LIMIT)
          .map(({ idMeal, strMealThumb, strMeal, strCategory: mealCategory }, i) => (
            <div key={ idMeal } data-testid={ `${i}-recomendation-card` }>
              <RecipeCard
                key={ idMeal }
                img={ strMealThumb }
                name={ strMeal }
                index={ i }
                id={ idMeal }
                type="foods"
                category={ mealCategory }
              />
            </div>))}
      </section>
      <Link to={ `/drinks/${recipeId}/in-progress` }>
        <ButtonStart type="button" data-testid="start-recipe-btn">
          Start Recipe
        </ButtonStart>
      </Link>
    </main>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
