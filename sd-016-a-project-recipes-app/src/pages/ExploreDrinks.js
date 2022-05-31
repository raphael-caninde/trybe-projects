import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks({ history }) {
  const [drinkId, setDrinkId] = useState('');

  useEffect(() => {
    requestAPI.getDrinks.infoRandom().then((v) => setDrinkId(v.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" haveSearch={ false } get="a" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/drinks/${drinkId}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
