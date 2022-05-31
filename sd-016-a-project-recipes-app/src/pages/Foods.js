/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import requestAPI from '../services/requestAPI';
import InitialCategory from '../components/InitialCategory';
import RecipeContext from '../context/RecipeContext';
import Section from '../style/sectionFood';

function Foods() {
  const [firstMeals, setFirstMeals] = useState([]);
  const [firstCategories, setFirstCategories] = useState([]);
  const
    { mainMeals, setMainMeals, mainFilter,
      categoryFilter, searchBarFilter, enableSearch,
    } = useContext(RecipeContext);

  useEffect(() => {
    requestAPI.getMeals.byNameOrFirst12().then((data) => setFirstMeals(data.meals));
    requestAPI.getMeals.categories().then((data) => setFirstCategories(data.meals));
  }, []);

  useEffect(() => {
    if (mainFilter === '') setMainMeals(firstMeals);
    if (mainFilter === 'category') setMainMeals(categoryFilter);
    if (mainFilter === 'searchBar') setMainMeals(searchBarFilter.meals);
  }, [firstMeals, categoryFilter, mainFilter, searchBarFilter]);

  const INITIAL_MEAL_LIMIT = 12;
  const INITIAL_CATEGORY_LIMIT = 5;
  const initialCategories = firstCategories.filter((_, i) => i < INITIAL_CATEGORY_LIMIT);

  return (
    <main>
      {mainMeals && mainMeals.length === 1 && <Redirect
        to={ { pathname: `/foods/${mainMeals[0].idMeal}` } }
      />}
      <Header title="Foods" haveSearch get="getMeals" />
      {!enableSearch && <InitialCategory
        categories={ initialCategories }
        get="getMeals"
        type="meals"
      />}
      <Section>
        {mainMeals ? mainMeals
          .filter((_, i) => i < INITIAL_MEAL_LIMIT)
          .map(({ idMeal, strMealThumb, strMeal }, i) => (
            <RecipeCard
              key={ idMeal }
              img={ strMealThumb }
              name={ strMeal }
              index={ i }
              id={ idMeal }
              type="foods"
              category=""
            />))
          : global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      </Section>
      <Footer />
    </main>
  );
}

export default Foods;
