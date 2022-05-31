import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  validateForms = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email) && password.length >= minLength;
  }

  render() {
    const { email, password } = this.state;
    const { submitInputEmail } = this.props;

    return (
      <main>
        <form>
          <h2>
            Trybe
            <p>Wallet</p>
            <div>
              <input
                data-testid="email-input"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={ email }
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <input
                data-testid="password-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={ password }
                onChange={ this.handleChange }
              />
            </div>
            <Link to="/carteira">
              <button
                type="button"
                value="Entrar"
                disabled={ !this.validateForms() }
                onClick={ () => submitInputEmail(email) }
              >
                Entrar
              </button>
            </Link>
          </h2>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  submitInputEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispach) => ({
  submitInputEmail: (emailValue) => dispach(submitEmail(emailValue)),
});

export default connect(null, mapDispatchToProps)(Login);
