import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { loading, name } = this.state;
    const loadingElement = <p>Carregando...</p>;
    if (loading) return loadingElement;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
