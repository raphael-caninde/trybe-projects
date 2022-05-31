import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import CategoryList from './CategoryList';
import ProductList from './ProductList';

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      listCat: [],
    };

    this.getCategory = this.getCategory.bind(this);
    this.handleButtonCategory = this.handleButtonCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  async handleButtonCategory(category) {
    const catProduct = await getProductsFromCategoryAndQuery('', category.name);
    this.setState({ listCat: catProduct.results });
  }

  async getCategory() {
    const requestCategory = await getCategories();
    this.setState({ categories: requestCategory });
  }

  render() {
    const { categories, listCat } = this.state;
    return (
      <div>
        <form>
          <ol>
            {categories.map((category) => (
              <li key={ category.id }>
                <button
                  data-testid="category"
                  type="button"
                  name="button-category"
                  onClick={ () => this.handleButtonCategory(category) }
                >
                  { category.name }
                </button>
              </li>
            ))}
          </ol>
        </form>
        <ProductList listCat={ listCat } />
      </div>
    );
  }
}
