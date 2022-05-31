import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends Component {
  render() {
    const { handleNextQuestion } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-next"
        className="bg-transparent hover:bg-blue-500 text-blue-700
        font-semiboldhover: text-white py-2 px-4  border border-blue-500
        hover: border-transparent rounded"
        onClick={ handleNextQuestion }
      >
        Próxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  handleNextQuestion: PropTypes.func.isRequired,
};

export default ButtonNext;
