import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      buttonEnabled: true,
    };
  }

  handleLogin = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    await history.push('/search');
    this.setState({ loading: false });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState({ buttonEnabled: this.checkLogin() });
    });
  }

  checkLogin = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length < minLength) return true;
    return false;
  }

  render() {
    const { name, loading, buttonEnabled } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? (<Loading />) : (
          <div>
            <h1>Login</h1>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ buttonEnabled }
              onClick={ this.handleLogin }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
