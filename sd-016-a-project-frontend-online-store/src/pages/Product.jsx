import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: [],
    };

    this.addCartDetails = this.addCartDetails.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const productApi = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const responseProduct = await productApi.json();
    this.setState({
      productDetails: responseProduct,
    });
  }

  addCartDetails({ target: { name } }) {
    const { productDetails } = this.state;
    const findProductDetails = [productDetails].find((product) => (
      product.id === name
    ));
    const atualProduct = localStorage.getItem('product')
      ? JSON.parse(localStorage.getItem('product'))
      : [];
    localStorage.setItem('product', JSON.stringify(
      [...atualProduct, [findProductDetails, 1]],
    ));
  }

  render() {
    const { productDetails } = this.state;
    return (
      <div>
        <div>
          <Link to="/"><h3>Home</h3></Link>
          <Link data-testid="shopping-cart-button" to="/cart"><h3>Carrinho</h3></Link>
        </div>
        <h1
          data-testid="product-detail-name"
        >
          { productDetails.title }
        </h1>
        <img src={ productDetails.thumbnail } alt={ productDetails.title } />
        <p>{ `R$${productDetails.price}` }</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          name={ productDetails.id }
          onClick={ this.addCartDetails }
        >
          Adicionar
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string) }).isRequired,
};
