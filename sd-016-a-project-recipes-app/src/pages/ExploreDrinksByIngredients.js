import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestAPI from '../services/requestAPI';

function ExploreDrinksByIngredients() {
  const [dataDrinks, setDataDrinks] = useState([]);

  useEffect(() => {
    requestAPI.getDrinks
      .byIngredientDrinks()
      .then((data) => setDataDrinks(data.drinks));
  }, []);

  const INITIAL_INGREDIENTS_LIMIT = 12;
  const drinksIngredients = dataDrinks.filter((_, i) => i < INITIAL_INGREDIENTS_LIMIT);

  return (
    <div>
      <Header title="Explore Ingredients" haveSearch={ false } get="a" />
      {drinksIngredients.map((v, index) => (
        <div key={ v.strIngredient1 } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${v.strIngredient1}-Small.png` }
            alt={ v.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{v.strIngredient1}</p>
        </div>
      ))}
      <h1>Explore Ingredients</h1>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
