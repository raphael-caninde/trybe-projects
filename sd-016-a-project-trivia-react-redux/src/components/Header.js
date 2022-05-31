import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  // getImageFetch = () => {
  //   const { gravatarEmail } = this.props;
  //   const hashEmail = md5(gravatarEmail).toString();
  //   const urlApi = `https://www.gravatar.com/avatar/${hashEmail}`;
  //   return urlApi;
  // }

  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header className="w-1/3 h-full flex flex-col items-center justify-evenly">
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          // src={ this.getImageFetch() }
          alt={ name }
          className="rounded-full w-12 h-12"
          data-testid="header-profile-picture"
        />
        <h3
          data-testid="header-player-name"
        >
          { name }
        </h3>
        <span
          data-testid="header-score"
          className="tracking-wider"
        >
          Placar:
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
