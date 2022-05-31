/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import requestAPI from '../services/requestAPI';
import Nav from '../style/buttonsFood';

function InitialCategory(props) {
  const { categories, get, type } = props;

  const { setMainFilter, setCategoryFilter } = useContext(RecipeContext);

  const [saveLastTarget, setSaveLastTarget] = useState('');
  let enableFilter = true;

  const handleClick = ({ target }) => {
    if (saveLastTarget === target.name) {
      enableFilter = !enableFilter;
      setSaveLastTarget('');
    }
    if (enableFilter) {
      requestAPI[get].byCategory(target.name).then((data) => {
        setCategoryFilter(data[type]);
        setMainFilter('category');
        setSaveLastTarget(target.name);
      });
    }
    if (!enableFilter) setMainFilter('');
  };

  const resetFilter = () => {
    setMainFilter('');
    setSaveLastTarget('');
  };

  return (
    <Nav>
      <button
        type="button"
        onClick={ resetFilter }
        data-testid="All-category-filter"
        className="buttons"
      >
        All
      </button>
      {categories.map(({ strCategory }) => (
        <button
          key={ strCategory }
          name={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
          className="buttons"
        >
          {strCategory}
        </button>
      ))}
    </Nav>
  );
}

InitialCategory.propTypes = {
  categories: PropTypes.arrayOf(Object).isRequired,
  get: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InitialCategory;
