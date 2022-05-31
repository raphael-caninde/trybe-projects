import local from '../services/handleLocal';

const updateLocalInProgress = (type, id, ingredientList) => {
  const actualInProgress = local.get.inProgressRecipes();

  actualInProgress[type] = { ...actualInProgress[type], [id]: ingredientList };
  local.set.inProgressRecipes(actualInProgress);
};

export default updateLocalInProgress;
