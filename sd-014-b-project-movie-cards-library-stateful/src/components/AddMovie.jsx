// implement AddMovie component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../inputMovie/Title';
import Subtitle from '../inputMovie/Subtitle';
import Storyline from '../inputMovie/Storyline';
import Image from '../inputMovie/Image';
import Rating from '../inputMovie/Rating';
import Genre from '../inputMovie/Genre';

export default class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      subtitle: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event, onClick) => {
    event.preventDefault();
    onClick(this.state);
    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  render() {
    const { onClick } = this.props;
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;

    return (
      <form data-testid="add-movie-form">
        <Title title={ title } onChange={ this.handleChange } />
        <Subtitle subtitle={ subtitle } onChange={ this.handleChange } />
        <Image imagePath={ imagePath } onChange={ this.handleChange } />
        <Storyline storyline={ storyline } onChange={ this.handleChange } />
        <Rating rating={ rating } onChange={ this.handleChange } />
        <Genre genre={ genre } onChange={ this.handleChange } />
        <button
          type="button"
          data-testid="send-button"
          onClick={ (event) => this.handleSubmit(event, onClick) }
        >
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};
