import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class AddCard extends Component {
  render() {
    const { removeCard, filterCard } = this.props;

    return (
      <div>
        {filterCard().map((card) => (
          <div key={ card.cardName }>
            <Card
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
            />
            <button
              data-testid="delete-button"
              type="button"
              name={ card.cardName }
              onClick={ removeCard }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    );
  }
}

AddCard.propTypes = {
  removeCard: PropTypes.func.isRequired,
  filterCard: PropTypes.arrayOf(PropTypes.shape({
    cardName: PropTypes.string.isRequired,
    cardDescription: PropTypes.string.isRequired,
    cardAttr1: PropTypes.string.isRequired,
    cardAttr2: PropTypes.string.isRequired,
    cardAttr3: PropTypes.string.isRequired,
    cardImage: PropTypes.string.isRequired,
    cardRare: PropTypes.string.isRequired,
    cardTrunfo: PropTypes.bool.isRequired,
  })).isRequired,
};

export default AddCard;
