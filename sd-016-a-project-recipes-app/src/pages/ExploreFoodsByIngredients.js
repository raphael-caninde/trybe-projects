import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import requestAPI from '../services/requestAPI';
import RecipeContext from '../context/RecipeContext';

function ExploreFoodsByIngredients(props) {
  const [dataMeals, setDataMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setValueIngredientMeals } = useContext(RecipeContext);

  useEffect(() => {
    requestAPI.getMeals
      .byIngredientMeals()
      .then((data) => setDataMeals(data.meals));
    setIsLoading(false);
  }, []);

  const INITIAL_INGREDIENTS_LIMIT = 12;
  const mealsIngredients = dataMeals.filter((_, i) => i < INITIAL_INGREDIENTS_LIMIT);

  const clickEvent = (event) => {
    console.log(event.target.value);
    const { history } = props;
    setValueIngredientMeals(event.target.value);
    setIsLoading(true);
    history.push('/foods');
  };

  return (
    <div>
      <Header title="Explore Ingredients" haveSearch={ false } get="a" />
      {isLoading === true
        ? <Loading />
        : mealsIngredients.map((v, index) => (
          <button
            type="button"
            key={ v.idIngredient }
            data-testid={ `${index}-ingredient-card` }
            value={ v.strIngredient }
            onClick={ (event) => clickEvent(event) }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${v.strIngredient}-Small.png` }
              alt={ v.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{v.strIngredient}</p>
          </button>
        )) }
      <Footer />
    </div>
  );
}

ExploreFoodsByIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoodsByIngredients;
