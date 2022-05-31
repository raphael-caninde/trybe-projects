import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import AddCard from './components/AddCard';
import Filter from './components/Filter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      newCard: [],
      searchName: '',
      filterRare: 'todas',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.checkedTrunfo = this.checkedTrunfo.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.filterCard = this.filterCard.bind(this);
  }

  onInputChange = ({ target: { name, value, type, checked } }) => {
    const inputValue = (type === 'checkbox') ? checked : value;
    this.setState({ [name]: inputValue }, () => {
      this.setState({ isSaveButtonDisabled: this.checkForm() });
    });
  }

  onSaveButtonClick(event) {
    const { cardTrunfo } = this.state;
    event.preventDefault();
    this.addNewCard(this.state);
    if (cardTrunfo) this.setState({ hasTrunfo: true });
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  addNewCard(card) {
    const { newCard } = this.state;
    this.setState({
      newCard: [...newCard, card],
    });
  }

  checkForm() {
    const { cardName, cardDescription, cardImage,
      cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const numberMax = 90;
    const total = 210;

    if (cardName === '' || cardDescription === '' || cardImage === '') return true;
    if (cardAttr1 > numberMax || cardAttr1 < 0) return true;
    if (cardAttr2 > numberMax || cardAttr2 < 0) return true;
    if (cardAttr3 > numberMax || cardAttr3 < 0) return true;

    if (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > total) {
      return true;
    }

    return false;
  }

  checkedTrunfo() {
    const { newCard } = this.state;
    const checkTrunfo = newCard.every((card) => card.cardTrunfo);
    this.setState({ hasTrunfo: checkTrunfo }, () => {
      this.setState({ hasTrunfo: false });
    });
  }

  removeCard({ target: { name } }) {
    const { newCard } = this.state;
    this.setState({
      newCard: newCard.filter((card) => card.cardName !== name),
    }, () => { this.checkedTrunfo(); });
  }

  filterCard() {
    const { newCard, searchName, filterRare } = this.state;
    let filterCards = newCard
      .filter(({ cardName }) => (
        cardName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())));

    if (filterRare !== 'todas') {
      filterCards = filterCards.filter(({ cardRare }) => cardRare === filterRare);
    }
    console.log(filterCards);
    return filterCards;
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      newCard, searchName, filterRare } = this.state;

    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardImage={ cardImage }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <Filter
          searchName={ searchName }
          filterRare={ filterRare }
          onInputChange={ this.onInputChange }
        />
        <AddCard
          newCard={ newCard }
          removeCard={ this.removeCard }
          filterCard={ this.filterCard }
        />
      </div>
    );
  }
}

export default App;

/*  links que ajudaram
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
https://www.youtube.com/watch?v=5Tq4-UgPTDs
*/
