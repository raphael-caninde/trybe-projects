import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" haveSearch={ false } get="a" />
      <h1>FavoriteRecipes</h1>
    </div>
  );
}

export default FavoriteRecipes;
