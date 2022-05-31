import React, { useContext/* , useState  */ } from 'react';
import PropTypes from 'prop-types';
import ingredientsArray from '../hooks/ingredientsArray';
import updateLocalInProgress from '../hooks/updateLocalInProgress';
import RecipeContext from '../context/RecipeContext';
import local from '../services/handleLocal';

export default function InProgressIngredients({ recipeId, details, type }) {
  const { setEnableFinish } = useContext(RecipeContext);
  const arrayOfIngredients = ingredientsArray(details);
  // const [isCheck, setIsCheck] = useState(false);

  let ingredientsDone = local.get.inProgressRecipes()[type][recipeId];
  if (!ingredientsDone) ingredientsDone = [];

  const verifyFinish = () => (arrayOfIngredients.length === ingredientsDone.length
    ? setEnableFinish(true) : setEnableFinish(false));

  const handleChange = ({ target: { checked, name } }) => {
    if (checked) ingredientsDone.push(name);
    else ingredientsDone = ingredientsDone.filter((ing) => ing !== name);

    updateLocalInProgress(type, recipeId, ingredientsDone);
    if (ingredientsDone.length === 0) {
      const actualChecked = local.get.inProgressRecipes();
      delete actualChecked[type][recipeId];
      local.set.inProgressRecipes(actualChecked);
    }
    verifyFinish();
    // setIsCheck(true);
  };

  return (
    <ul>
      {arrayOfIngredients.map((i, index) => (
        <li key={ index }>
          <label
            htmlFor={ index }
            data-testid={ `${index}-ingredient-step` }
            // style={ { textDecoration: isCheck ? 'line-through' : 'inherit' } }
          >
            <input
              key={ i }
              type="checkbox"
              id={ index }
              name={ i }
              onChange={ (event) => handleChange(event) }
              defaultChecked={ ingredientsDone.some((e) => e === i) }
            />
            {i}
          </label>
        </li>
      ))}
    </ul>
  );
}

InProgressIngredients.propTypes = {
  details: PropTypes.shape({
    strArea: PropTypes.string,
  }).isRequired,
  recipeId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
