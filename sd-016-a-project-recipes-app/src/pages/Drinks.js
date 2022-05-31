/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import requestAPI from '../services/requestAPI';
import InitialCategory from '../components/InitialCategory';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const [firstDrinks, setFirstDrinks] = useState([]);
  const [firstCategories, setFirstCategories] = useState([]);
  const
    { mainDrinks, setMainDrinks, mainFilter,
      categoryFilter, searchBarFilter, enableSearch,
    } = useContext(RecipeContext);

  useEffect(() => {
    requestAPI.getDrinks.byNameOrFirst12().then((data) => setFirstDrinks(data.drinks));
    requestAPI.getDrinks.categories().then((data) => setFirstCategories(data.drinks));
  }, []);

  useEffect(() => {
    if (mainFilter === '') setMainDrinks(firstDrinks);
    if (mainFilter === 'category') setMainDrinks(categoryFilter);
    if (mainFilter === 'searchBar') setMainDrinks(searchBarFilter.drinks);
  }, [firstDrinks, categoryFilter, mainFilter, searchBarFilter]);

  const INITIAL_DRINK_LIMIT = 12;
  const INITIAL_CATEGORY_LIMIT = 5;
  const initialCategories = firstCategories.filter((_, i) => i < INITIAL_CATEGORY_LIMIT);

  return (
    <div>
      {mainDrinks && mainDrinks.length === 1 && <Redirect
        to={ { pathname: `/drinks/${mainDrinks[0].idDrink}` } }
      />}
      <Header title="Drinks" haveSearch get="getDrinks" />
      {!enableSearch && <InitialCategory
        categories={ initialCategories }
        get="getDrinks"
        type="drinks"
      />}
      {mainDrinks ? mainDrinks
        .filter((_, i) => i < INITIAL_DRINK_LIMIT)
        .map(({ idDrink, strDrinkThumb, strDrink }, i) => (
          <RecipeCard
            key={ idDrink }
            img={ strDrinkThumb }
            name={ strDrink }
            index={ i }
            id={ idDrink }
            type="drinks"
            category=""
          />)) : global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      <Footer />
    </div>
  );
}

export default Drinks;
