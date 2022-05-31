import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick } = this.props;

    return (
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            data-testid="name-input"
            name="cardName"
            value={ cardName }
            type="text"
            id="name-input"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="textarea">
          Descrição:
          <textarea
            data-testid="description-input"
            name="cardDescription"
            value={ cardDescription }
            type="textarea"
            id="textarea"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr1-input">
          Attr01
          <input
            data-testid="attr1-input"
            name="cardAttr1"
            value={ cardAttr1 }
            type="number"
            id="attr1-input"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr2-input">
          Attr02
          <input
            data-testid="attr2-input"
            name="cardAttr2"
            value={ cardAttr2 }
            type="number"
            id="attr2-input"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr3-input">
          Attr03
          <input
            data-testid="attr3-input"
            name="cardAttr3"
            value={ cardAttr3 }
            type="number"
            id="attr3-input"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="image-input">
          Imagem
          <input
            data-testid="image-input"
            name="cardImage"
            value={ cardImage }
            type="text"
            id="image-input"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="rare-input">
          Raridade
          <select
            data-testid="rare-input"
            name="cardRare"
            value={ cardRare }
            id="rare-input"
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          Super Trybe Trunfo
          {hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
            <input
              data-testid="trunfo-input"
              name="cardTrunfo"
              checked={ cardTrunfo }
              type="checkbox"
              id="trunfo-input"
              onChange={ onInputChange }
            />
          )}
        </label>
        <button
          data-testid="save-button"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
