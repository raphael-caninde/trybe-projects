import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods({ history }) {
  const [foodId, setFoodId] = useState('');

  useEffect(() => {
    requestAPI.getMeals.infoRandom().then((v) => setFoodId(v.meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header title="Explore Foods" haveSearch={ false } get="a" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/foods/${foodId}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
