import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albums: [],
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
      artist: value,
    });
  }

  handleApiRequest = async () => {
    const { artist } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const albums = await searchAlbumsAPI(artist);
        this.setState({
          loading: false,
          artist: '',
          albums,
        });
      },
    );
  }

  search = () => {
    const { artist } = this.state;
    const minLength = 2;
    return (
      <div>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist"
            onChange={ this.handleChange }
            value={ artist }
            placeholder="Nome do Artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < minLength }
            onClick={ this.handleApiRequest }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }

  albumCardRender = () => {
    const { albums, name } = this.state;
    if (!albums.length) {
      return (
        <p><strong>Nenhum álbum foi encontrado</strong></p>
      );
    }
    return (
      <div>
        <p>{`Resultado de álbuns de: ${name}`}</p>
        {albums.map((album) => (
          <AlbumList key={ album.collectionId } albumInfo={ album } />
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.search() }
        { loading ? <Loading /> : this.albumCardRender() }
      </div>
    );
  }
}

export default Search;
