import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import ProductList from '../components/ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      listProduct: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async getProduct() {
    const { product } = this.state;
    const requestProduct = await getProductsFromCategoryAndQuery('', product);
    this.setState({ listProduct: requestProduct.results });
  }

  preventDefaultForm = (event) => {
    event.preventDefault();
  }

  render() {
    const { product, listProduct } = this.state;

    return (
      <div>
        <form onSubmit={ this.preventDefaultForm }>
          <input
            type="text"
            name="product"
            value={ product }
            data-testid="query-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.getProduct }
          >
            Pesquisar
          </button>
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
          <Link data-testid="shopping-cart-button" to="/cart">
            carrinho
          </Link>
        </form>
        <div>
          <Category />
          <ProductList listProduct={ listProduct } />
        </div>
      </div>
    );
  }
}
