import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      collectionName: '',
      artistName: '',
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleApiRequest(id);
  }

  async handleApiRequest(id) {
    const musicApi = await getMusics(id);
    this.setState({
      artistName: musicApi[0].artistName,
      collectionName: musicApi[0].collectionName,
      loading: false,
      musics: [...musicApi],
    });
  }

  renderCardAlbum = () => {
    const { collectionName, artistName, musics } = this.state;
    return (
      <>
        <span data-testid="artist-name">{ artistName }</span>
        <span data-testid="album-name">{ collectionName }</span>
        {musics.slice(1).map((track, trackId) => (
          <MusicCard
            key={ trackId }
            music={ track }
          />
        ))}

      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? Loading : this.renderCardAlbum()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.objectOf(PropTypes.string) }).isRequired,
};

export default Album;
