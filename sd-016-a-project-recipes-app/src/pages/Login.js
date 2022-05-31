import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import local from '../services/handleLocal';
import * as C from '../style/login';

function Login() {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState('');
  const { push } = useHistory();

  const validateForms = () => {
    const minLength = 6;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email.email) && password.length > minLength;
  };

  const handleClick = () => {
    const TOKEN = 1;
    local.set.mealsToken(TOKEN);
    local.set.cocktailsToken(TOKEN);
    local.set.user(email);

    push('/foods');
  };

  return (
    <C.Container>
      <C.Form>
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            id="email-input"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail({ email: target.value }) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            id="password-input"
            name="password"
            data-testid="password-input"
            disabled=""
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validateForms() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </C.Form>
    </C.Container>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
