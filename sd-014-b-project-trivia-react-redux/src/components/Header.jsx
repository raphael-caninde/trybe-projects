import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../style.css/header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header className="header-container">
        <div data-testid="header-player-name">
          <img
            className="img-gravatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt={ name }
          />
          Jogador:
          { name }
        </div>
        <div data-testid="header-score">
          Pontos:
          { score }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  token: state.login.token,
  email: state.login.email,
  score: state.game.score,
});

export default connect(mapStateToProps)(Header);
