import React, { useEffect, useState } from 'react';
import local from '../services/handleLocal';
import ShareDoneRecipe from './ShareDoneRecipe';

export default function DoneRecipeCard() {
  const [allItens, setAllItens] = useState([]);
  useEffect(() => {
    setAllItens(local.get.doneRecipes());
  }, []);

  console.log(allItens);

  return (
    <div>
      {allItens && allItens.map((item, index) => (
        <div key={ item.name }>
          <img
            src={ item.image }
            alt={ item.name }
            width={ 200 }
            data-testid={ `${index}-horizontal-image` }
          />
          <ShareDoneRecipe
            id={ `${index}-horizontal-share-btn` }
            urlId={ item.id }
            type={ item.type }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            {item.category
              ? `${item.alcoholicOrNot}${item.nationality} - ${item.category}`
              : item.alcoholicOrNot}
          </span>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {item.name}
          </h3>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {`Done in: ${item.doneDate}`}
          </p>
          {item.tags.map((tag) => (
            <span
              key={ `${item.name}_${tag}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
