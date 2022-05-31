import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [mainMeals, setMainMeals] = useState([]);
  const [mainDrinks, setMainDrinks] = useState([]);
  const [mainFilter, setMainFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchBarFilter, setSearchBarFilter] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);
  const [valueIngredientMeals, setValueIngredientMeals] = useState('test');
  const [enableFinish, setEnableFinish] = useState(false);

  const contextValue = {
    mainMeals,
    setMainMeals,
    mainDrinks,
    setMainDrinks,
    mainFilter,
    setMainFilter,
    categoryFilter,
    setCategoryFilter,
    searchBarFilter,
    setSearchBarFilter,
    enableSearch,
    setEnableSearch,
    valueIngredientMeals,
    setValueIngredientMeals,
    enableFinish,
    setEnableFinish,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
