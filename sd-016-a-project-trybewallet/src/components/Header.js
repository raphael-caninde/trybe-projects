import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  totalExpensives = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const result = expenses.reduce((acc, curr) => {
        const { value, exchangeRates, currency } = curr;
        const resultCoin = Number(exchangeRates[currency].ask * value);
        acc += resultCoin;
        return acc;
      }, 0);
      return result;
    }
    return 0;
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h2>
          Trybe
          <p>Wallet</p>
        </h2>
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          {this.totalExpensives().toFixed(2)}
          <div data-testid="header-currency-field">
            BRL
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
