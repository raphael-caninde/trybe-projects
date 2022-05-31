/* Requisito feito com ajuda do igor hamzi e denilson santushi */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  hendleCheck = async () => {
    const { music } = this.props;
    this.setState({ loading: true, check: true });
    await addSong(music);
    this.setState({ loading: false });
  }

  getFavoriteMusic = async () => {
    const { music: { trackId } } = this.props;
    const favoriteMusic = await getFavoriteSongs();
    favoriteMusic.some((song) => song.trackId === trackId
    && this.setState({ check: true }));
  }

  render() {
    const { check, loading } = this.state;
    const { music: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        <span>{trackName}</span>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor="favoriteMusic">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              type="checkbox"
              checked={ check }
              onChange={ this.hendleCheck }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};
