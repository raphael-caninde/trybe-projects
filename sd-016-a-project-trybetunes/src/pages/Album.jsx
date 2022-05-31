import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistName: '',
      collectionName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.handleMusicApi();
  }

  handleMusicApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musicApi = await getMusics(id);
    this.setState({
      artistName: musicApi[0].artistName,
      collectionName: musicApi[0].collectionName,
      musics: musicApi,
    });
  }

  render() {
    const { artistName, collectionName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{ artistName }</p>
          <p data-testid="album-name">{ collectionName }</p>
          {musics.slice(1).map((music) => (
            <div key={ music.trackNumber }>
              <MusicCard music={ music } />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string) }).isRequired,
};

export default Album;
