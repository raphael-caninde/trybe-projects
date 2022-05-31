import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = ({ target: { checked } }) => {
    const { music } = this.props;

    this.setState({
      loading: true,
    });

    if (checked) {
      addSong(music).then(() => {
        this.setState({ loading: false });
      });
    }
    this.fetchFavorites();
  }

  fetchFavorites = () => {
    getFavoriteSongs()
      .then((data) => this.setState({ favorites: data }));
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading />
          : (
            <label htmlFor="favorite-checkbox">
              Favorita
              <input
                type="checkbox"
                onChange={ this.handleChange }
                id="favorite-checkbox"
                checked={ favorites.some((music) => music.trackId === trackId) }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
