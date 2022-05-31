import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestAPI from '../services/requestAPI';

function ExploreFoodsByNationalities(props) {
  const LIMIT = 12;
  const [dataNationalities, setDataNationalities] = useState([]);
  const [valueRecipe, setValueRecipe] = useState('');
  const [initialRecipe, setInitialRecipe] = useState([]);
  const [filterRecipe, setFilterRecipe] = useState([]);

  useEffect(() => {
    requestAPI.getMeals
      .byNationalityAll()
      .then((data) => setDataNationalities(data.meals));
    requestAPI.getMeals
      .byNameOrFirst12()
      .then((data) => setInitialRecipe(data.meals));
  }, []);

  useEffect(() => {
    if (valueRecipe === 'All') {
      requestAPI.getMeals
        .byNameOrFirst12()
        .then((data) => setFilterRecipe(data.meals));
    }
    requestAPI.getMeals
      .byNationality(valueRecipe)
      .then((data) => setFilterRecipe(data.meals));
  }, [valueRecipe]);

  function handleChange(event) {
    setValueRecipe(event.target.value);
  }

  const clickRouter = (id) => {
    const { history } = props;
    history.push(`/foods/${id}`);
  };

  return (
    <>
      <Header title="Explore Nationalities" haveSearch get="a" />
      <select
        id="nationalities"
        value={ valueRecipe }
        data-testid="explore-by-nationality-dropdown"
        onChange={ (event) => handleChange(event) }
      >
        <option value="All" data-testid="All-option">All</option>
        {dataNationalities.map(({ strArea }, index) => (
          <option key={ index } value={ strArea } data-testid={ `${strArea}-option` }>
            {strArea}
          </option>
        ))}
      </select>
      {filterRecipe && filterRecipe.length > 0
        ? filterRecipe
          .map(({ strMeal, strMealThumb, idMeal }, idx) => idx < LIMIT && (
            <button
              type="button"
              key={ strMeal }
              data-testid={ `${idx}-recipe-card` }
              onClick={ () => clickRouter(idMeal) }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${idx}-card-img` }
                width="100px"
              />
              <p data-testid={ `${idx}-card-name` }>{strMeal}</p>
            </button>
          ))
        : initialRecipe
          .map(({ strMeal, strMealThumb, idMeal }, idx2) => idx2 < LIMIT && (
            <button
              type="button"
              key={ strMeal }
              data-testid={ `${idx2}-recipe-card` }
              onClick={ () => clickRouter(idMeal) }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${idx2}-card-img` }
                width="100px"
              />
              <p data-testid={ `${idx2}-card-name` }>{strMeal}</p>
            </button>
          ))}
      <Footer />
    </>
  );
}

ExploreFoodsByNationalities.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoodsByNationalities;
