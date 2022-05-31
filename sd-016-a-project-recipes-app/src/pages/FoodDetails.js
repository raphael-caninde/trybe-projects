/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import DetailsVideo from '../components/DetailsVideo';
import DetailsIngredients from '../components/DetailsIngredients';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { Section, MainContainer, ButtonStart } from '../style/foodDetails';

function FoodDetails(props) {
  const [details, setDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { match: { params: { recipeId } } } = props;
  const { strMeal, strMealThumb, strCategory, strYoutube } = details;

  useEffect(() => {
    requestAPI.getMeals.infoById(recipeId)
      .then((info) => setDetails(info.meals[0]));
    requestAPI.getDrinks.byNameOrFirst12()
      .then((info) => setRecommendations((info.drinks)));
  }, []);

  const RECOMMENDATION_LIMIT = 6;

  function recipesCards() {
    return (
      recommendations && recommendations
        .filter((_, i) => i < RECOMMENDATION_LIMIT)
        .map(({ idDrink, strDrinkThumb, strDrink, strCategory: drinkCategory }, i) => (
          <Link to={ `/drinks/${idDrink}` } className="card" key={ idDrink }>
            <div
              className="card"
              data-testid={ `${i}-recomendation-card` }
            >
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${i}-card-img` }
                className="imgcard"
              />
              <span>{ drinkCategory }</span>
              <h3 data-testid={ `${i}-recomendation-title` }>{strDrink}</h3>
            </div>
          </Link>
        ))
    );
  }

  return (
    <MainContainer>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width={ 200 }
        className="image"
      />
      <section className="favorite">
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <span data-testid="recipe-category">{ strCategory }</span>
        <div>
          <ShareButton />
          { details.length !== 0 && <FavoriteButton
            details={ details }
            type="food"
            idType="idMeal"
          /> }
        </div>
      </section>
      <section className="ingredients">
        <h2>Ingredients</h2>
        { details.length !== 0 && <DetailsIngredients details={ details } /> }
      </section>
      <section className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>
      <section className="video">
        <h2>Video</h2>
        {details.length !== 0 && <DetailsVideo
          title={ strMeal }
          url={ strYoutube }
        />}
      </section>
      <Section>
        <div>
          <h2>Recommended</h2>
        </div>
        <div className="cardFoods">
          { recipesCards() }
        </div>
      </Section>
      <Link to={ `/foods/${recipeId}/in-progress` }>
        <ButtonStart type="button" data-testid="start-recipe-btn">
          Start Recipe
        </ButtonStart>
      </Link>
    </MainContainer>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
