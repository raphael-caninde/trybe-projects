import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

const Header = () => {
  const {
    data,
    setData,
    searchPlanet,
    setSearchPlanet,
    column,
    setColumn,
    comparasion,
    setComparasion,
    values,
    setValues,
    selectColumn,
    setSelectColumn,
  } = useContext(TableContext);

  function filterButton() {
    setSelectColumn(selectColumn.filter((option) => option !== column));
    const filterValue = data.filter((planet) => {
      if (comparasion === 'maior que') {
        return Number(planet[column]) > Number(values);
      }
      if (comparasion === 'menor que') {
        return Number(planet[column]) < Number(values);
      }
      if (comparasion === 'igual a') {
        return Number(planet[column]) === Number(values);
      }
      return data;
    });
    setData(filterValue);
  }

  return (
    <header>
      <h1>Star Wars</h1>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          name="seach"
          id="name-filter"
          placeholder="Busque aqui"
          value={ searchPlanet }
          onChange={ ({ target: { value } }) => setSearchPlanet(value) }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target: { value } }) => setColumn(value) }
        >
          {selectColumn.map((option, idx) => (
            <option key={ idx } value={ option }>{ option }</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparasion }
          onChange={ ({ target: { value } }) => setComparasion(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          id="value-filter"
          value={ values }
          onChange={ ({ target: { value } }) => setValues(value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterButton }
        >
          Filtrar
        </button>
      </div>
    </header>
  );
};

export default Header;
