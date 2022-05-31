import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      buttonSearch: true,
      loading: false,
      albumList: [],
      renderList: false,
      renderArtistName: '',
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => {
      this.setState({ buttonSearch: this.checkSearch() });
    });
  }

  handleArtistApi = async () => {
    const { artist } = this.state;
    this.setState({ loading: true }, async () => {
      const albumList = await searchAlbumsAPI(artist);
      this.setState({
        renderArtistName: artist,
        loading: false,
        artist: '',
        albumList,
        renderList: true,
      });
    });
  }

  checkSearch = () => {
    const { artist } = this.state;
    const minLength = 2;
    if (artist.length < minLength) return true;
    return false;
  }

  search = () => {
    const { buttonSearch, artist } = this.state;
    return (
      <form>
        <input
          data-testid="search-artist-input"
          type="text"
          name="artist"
          value={ artist }
          id="search-artist"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonSearch }
          onClick={ this.handleArtistApi }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  albumsList = () => {
    const { renderArtistName, albumList } = this.state;
    if (!albumList.length) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
    return (
      <div>
        <p>{`Resultado de álbuns de: ${renderArtistName}`}</p>
        {albumList.map((album) => (
          <div key={ album.artistId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
            </Link>
            <p>{ album.artistName }</p>
            <p>{ album.collectionName }</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading, renderList } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.search() }
        { renderList && this.albumsList() }
      </div>
    );
  }
}

export default Search;
