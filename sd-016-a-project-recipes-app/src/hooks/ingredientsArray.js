const ingredientsArray = (details) => {
  const ingredients = [];
  const MAX = 20;
  for (let i = 1; i <= MAX; i += 1) {
    if (details[`strMeasure${[i]}`]) {
      ingredients
        .push(`${details[`strIngredient${[i]}`]} - ${details[`strMeasure${[i]}`]}`);
    } else ingredients.push(details[`strIngredient${[i]}`]);
  }
  return ingredients.filter((i) => i !== ' -  ' && i !== ' - ' && i);
};

export default ingredientsArray;
