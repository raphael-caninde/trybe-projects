import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { searchName, filterRare, onInputChange } = this.props;

    return (
      <div>
        <h2>Todas as Cartas</h2>
        <div>
          <input
            data-testid="name-filter"
            type="text"
            name="searchName"
            value={ searchName }
            id="searchName"
            onChange={ onInputChange }
          />
          <select
            data-testid="rare-filter"
            name="filterRare"
            value={ filterRare }
            id="rare-input"
            onChange={ onInputChange }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
          <button
            type="button"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  searchName: PropTypes.string.isRequired,
  filterRare: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Filter;
