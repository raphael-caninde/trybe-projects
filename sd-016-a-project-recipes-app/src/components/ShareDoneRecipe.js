import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareDoneRecipe(props) {
  const { id, urlId, type } = props;
  const [copyUrl, setCopyUrl] = useState(false);
  const TWO = 2000;
  setTimeout(() => setCopyUrl(false), TWO);

  return (
    <div>
      <button
        type="button"
        onClick={ () => navigator.clipboard.writeText(window.location.href
          .replace('done-recipes', `${type}s/${urlId}`))
          .then(() => setCopyUrl(true))
          .then(() => setTimeout(() => setCopyUrl(false), TWO)) }
      >
        <img
          src={ shareIcon }
          alt="ShareButton"
          data-testid={ id }
        />
      </button>
      {copyUrl && <span>Link copied!</span>}
    </div>
  );
}

ShareDoneRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  urlId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareDoneRecipe;
