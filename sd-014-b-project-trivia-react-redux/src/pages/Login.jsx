import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLogin, saveTokenAction,
  getNameEmail, resetScore } from '../redux/actions/actions';
import '../style.css/login.css';
import titletrivia from '../img/titletrivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForms = this.validateForms.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.buttonSettings = this.buttonSettings.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateForms() {
    const { email, name } = this.state;
    const minLength = 2;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email) && name.length > minLength;
  }

  async handleClick() {
    const { triviaAction, saveToken } = this.props;
    const urlToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await urlToken.json();
    const { token } = response;
    saveToken(token);
    triviaAction(token);
    const { getNameEmailAction, resetScoreAction } = this.props;
    const { name, email } = this.state;
    getNameEmailAction(name, email);
    const startScore = 0;
    resetScoreAction(startScore);
    localStorage.setItem('token', token);
  }

  buttonSettings() {
    const { history } = this.props;
    return (
      <button
        className="btn-settings"
        data-testid="btn-settings"
        type="button"
        onClick={ () => history.push('/settings') }
      >
        Configurações
      </button>
    );
  }

  render() {
    const { email, name } = this.state;
    return (
      <main className="container">
        <img src={ titletrivia } alt="trivia-logo" className="logo-trivia" />
        <form className="form-container">
          <div className="div-input">
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <div className="div-input">
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              placeholder="Enter your email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              className="btn-play"
              disabled={ !this.validateForms() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
          { this.buttonSettings() }
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  saveToken: PropTypes.func.isRequired,
  triviaAction: PropTypes.func.isRequired,
  getNameEmailAction: PropTypes.func.isRequired,
  resetScoreAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    history: PropTypes.string,
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(saveTokenAction(token)),
  triviaAction: (token) => dispatch(fetchLogin(token)),
  getNameEmailAction: (name, email) => dispatch(getNameEmail(name, email)),
  resetScoreAction: (score) => dispatch(resetScore(score)),
});

const mapStateToProps = (state) => ({
  score: state.game.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
