/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import requestAPI from '../services/requestAPI';

function SearchBar(props) {
  const { get } = props;
  const { setSearchBarFilter, setMainFilter } = useContext(RecipeContext);

  const [radioInput, setRadioInput] = useState('');
  const [searchBarInput, setSearchBarInput] = useState('');

  const handleChange = ({ target }) => {
    setSearchBarInput(target.value);
  };

  const onChangeValue = ({ target }) => {
    setRadioInput(target.value);
  };

  const handleClick = () => {
    if (radioInput === 'first-letter' && searchBarInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (searchBarInput) {
      switch (radioInput) {
      case 'name':
        return requestAPI[get].byNameOrFirst12(searchBarInput)
          .then((data) => setSearchBarFilter(data))
          .then(() => setMainFilter('searchBar'));
      case 'ingredient':
        return requestAPI[get].byIngredient(searchBarInput)
          .then((data) => setSearchBarFilter(data))
          .then(() => setMainFilter('searchBar'));
      case 'first-letter':
        return requestAPI[get].byFirstLetter(searchBarInput)
          .then((data) => setSearchBarFilter(data))
          .then(() => setMainFilter('searchBar'));
      default:
        global.alert('You need to select 1 (one) category');
      }
    } else {
      global.alert('You need to type something');
    }
  };

  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <div onChange={ onChangeValue }>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          name="options"
        />
        Ingredient
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          name="options"
        />
        Name
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
          name="options"
        />
        First letter
        <button
          type="button"
          data-testid="exec-search-btn"
          value="teste"
          onClick={ () => handleClick() }
        >
          Search
        </button>
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  get: PropTypes.string.isRequired,
};

export default SearchBar;
