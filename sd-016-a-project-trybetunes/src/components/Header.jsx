import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name } = await getUser();
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? (<Loading />) : (
          <h3 data-testid="header-user-name">{ name }</h3>
        )}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
