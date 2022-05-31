import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitValue } from '../actions';

const alimentacao = 'Alimentação';
export class FormsWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseCurrency: [],
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: alimentacao,
    };
  }

  componentDidMount() {
    this.requestApi();
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  requestApi = async () => {
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await url.json();
    const response = Object.keys(responseJson)
      .filter((currency) => currency !== 'USDT');
    this.setState({ responseCurrency: response });
  }

  handleClick = async () => {
    const { submitExpenses } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await url.json();
    const objExpenses = {
      value,
      description,
      method,
      currency,
      tag,
      responseJson,
    };
    submitExpenses(objExpenses);
    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: alimentacao,
    });
  }

  render() {
    const { value, description, responseCurrency, currency, tag, method } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            type="text"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description" value={ description }>
          descrição
          <input
            data-testid="description-input"
            type="text"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          moeda
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {responseCurrency.map((curr) => (
              <option value={ curr } key={ curr }>
                { curr }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          método de pagamento
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          tag
          <select
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormsWallet.propTypes = {
  submitValue: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispach) => ({
  submitExpenses: (value) => dispach(submitValue(value)),
});

export default connect(null, mapDispatchToProps)(FormsWallet);
