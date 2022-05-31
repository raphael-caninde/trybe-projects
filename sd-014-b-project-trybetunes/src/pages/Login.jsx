import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: false,
      loading: false,
      name: '',
    };
  }

  handleLogin = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, loginState: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  }

  render() {
    const { name, loginState, loading } = this.state;
    const minLength = 3;
    const loadingElement = <p>Carregando...</p>;
    if (loading) return loadingElement;
    if (loginState) return (<Redirect to="/search" />);

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          value={ name }
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ name.length < minLength }
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
