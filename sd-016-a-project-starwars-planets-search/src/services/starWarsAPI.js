const getPlanets = async () => {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const requestJson = await request.json();
  requestJson.results.forEach((result) => delete result.residents);
  return requestJson.results;
};

export default getPlanets;
