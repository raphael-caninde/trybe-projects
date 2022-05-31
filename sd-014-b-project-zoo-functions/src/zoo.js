// links que me ajudaram:
// https://masteringjs.io/tutorials/fundamentals/foreach-object
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/arguments
// recebi ajuda de glauco e samuel

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// usei o spread no parametro da função, para pegar o array e separar um valor para cada parametro.
// com a função 'filter' esta comparadando se o id do array species é igual ao id passado por parametro,
// se bater com a condição a função filter vai retornar um array com os elementos.
function getSpeciesByIds(...ids) {
  return species.filter((specie, index) => specie.id === ids[index]);
}

// usei a função 'find' para comparar se o nome do animal passado por parametro é igual ao do array e retorna o obj.
// com esse objeto atribuido a variavel 'nameAnimals', acessei a chave residents e usei a função every para saber se a idade
// é maior ou igual com a do array retornando true ou false.
function getAnimalsOlderThan(animal, age) {
  const nameAnimals = species.find((nAnimal) => nAnimal.name === animal);
  return nameAnimals.residents.every((ages) => ages.age >= age);
}

// usei a função 'find' para encontrar o primeiro ou ultimo nome de um funcionario passado por parametro
function getEmployeeByName(employe) {
  if (employe === undefined) return {};
  return employees.find((name) => name.firstName === employe || name.lastName === employe);
}

// usei o spread para concatenar os arrays, para criar um novo funcionario
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// usei a função 'some' para retorna true se o id passado por parametro contem na minha chave managers.
function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

// desestruturei o employees passando por parametro na função push, para adicionar um novo funcionario no array employees.
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// arguments.length fornece o número de argumentos realmente passados para uma função.
// criei uma condicção para verificar se a quantidade de argumentos passado para função estava vazio que retorna a quantidade do animal passado como argumento
// caso contrario a função reduce retorna um objeto com chave  acc[value.name] = value.residents.length;
function countAnimals(specie) {
  if (arguments.length !== 0) {
    return species.find((animal) => animal.name === specie).residents.length;
  }
  return species.reduce((acc, value) => {
    acc[value.name] = value.residents.length;
    return acc;
  }, {});
}

// criei uma condição que compara se entrans for false ou um objeto vazio, retorna 0 caso verdadeiro.
// desistruturei adult, child e senior e atribui no parametro entrants e essa função retorna o valor total a ser pago
function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

function getAnimalMap(options) {
  // seu código aqui
}

// declarei um obj vazio.
// usei o metodo keys do objeto global com parametro hours, para cada chave o objeto vazio recebe obj[key] e valor é string literal.
// atribui 'closed' no obj.monday.
// se o parametro for underfined vai retorna o obj com todos os dias e horarios, se não retorna um obj onde a chave é igual ao parametro da função, e o valor é o string literal do dia correspondente
function getSchedule(dayName) {
  const obj = {};
  Object.keys(hours).forEach((key) => {
    obj[key] = `Open from ${hours[key].open}am until ${hours[key].close % 12}pm`;
  });
  obj.Monday = 'CLOSED';
  if (dayName === undefined) {
    return obj;
  }
  return ({ [dayName]: obj[dayName] });
}

// Object.values retorna um array com os valores das propriedades de um dado objeto
// no employResponse recebeu o funcionario que bate com o id passado por parametro e atribui o id do animal que é responsavel
// no animalId recebe um array de objetos com as propriedades de todos os animais que batem com o id.
// fiz um reduce para descobrir qual a maior idade dentre os animais no array de objetos.
// Object.values retorna um array com os valores do animal com maior idade
function getOldestFromFirstSpecies(id) {
  const employResponse = employees.find((employ) => employ.id === id).responsibleFor[0];
  const animalId = species.find((animal) => animal.id === employResponse).residents;
  const oldOne = animalId.reduce((sum, item) => (item.age >= sum.age ? item : sum));
  return Object.values(oldOne);
}

// usei o object.keys com o parametro prices para transforma no array, usei o foreach para iterar no array,
// para cada idade de pessoa o preço dela recebeu a conta de porcentagem.
// na conta de porcentagem foi multiplicado por 100 e e divido por 100 para trabalhar com numeros inteiros e evitar problemas de numeros float.
function increasePrices(percentage) {
  return Object.keys(prices).forEach((person) => {
    prices[person] = Math.round(prices[person] * (1 + percentage / 100) * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
