export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
/*   const category = categoryId ? `category=${categoryId}` : '';
  const itemName = query ? `q=${query}` : '';
  const and = query && categoryId ? '&' : ''; */
  /* const endpoint = `https://api.mercadolibre.com/sites/MLB/search?${category}${and}${itemName}` */
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const requestReturn = await fetch(endpoint);
  const requestObject = await requestReturn.json();
  return requestObject;
}
