import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qntItens: 0,
    };

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    this.countItems();
  }

  countItems = () => {
    const product = JSON.parse(localStorage.getItem('product'));
    const totalItems = product
      ? product.reduce((acumulador, item) => (acumulador + item[1]), 0)
      : 0;
    this.setState({
      qntItens: totalItems,
    });
  }

  increase = ({ target: { name } }) => {
    const product = JSON.parse(localStorage.getItem('product'));
    product[name][1] += 1;
    localStorage.setItem('product', JSON.stringify(product));
    this.countItems();
  }

  decrease = ({ target: { name } }) => {
    const product = JSON.parse(localStorage.getItem('product'));
    const totalItem = product[name][1];
    product[name][1] = totalItem > 1
      ? totalItem - 1
      : totalItem;
    localStorage.setItem('product', JSON.stringify(product));
    this.countItems();
  }

  render() {
    const { qntItens } = this.state;
    const listProduct = localStorage.getItem('product')
      ? JSON.parse(localStorage.getItem('product'))
      : false;

    return (
      <div>
        <Link to="/"><h3>Home</h3></Link>
        <p>
          {listProduct ? `Itens: ${Number(qntItens)}` : 'Itens: 0' }
        </p>
        {listProduct ? (
          <div>
            {listProduct.map((product, index) => (
              <div key={ product[0].id }>
                <h1 data-testid="shopping-cart-product-name">
                  { product[0].title }
                </h1>
                <img src={ product[0].thumbnail } alt={ product[0].title } />
                <p>{ `R$${(product[0].price * product[1]).toFixed(2)}` }</p>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  name={ index }
                  onClick={ this.increase }
                >
                  +
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  { product[1] }
                </p>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  name={ index }
                  onClick={ this.decrease }
                >
                  -
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
      </div>
    );
  }
}
