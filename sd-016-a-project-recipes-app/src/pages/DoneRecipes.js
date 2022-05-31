import React from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" haveSearch={ false } get="a" />
      <h1>DoneRecipes</h1>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      <DoneRecipeCard />
    </div>
  );
}

export default DoneRecipes;
