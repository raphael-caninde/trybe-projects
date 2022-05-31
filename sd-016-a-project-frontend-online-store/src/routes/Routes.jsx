import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../pages/Search';
import Cart from '../pages/Cart';
import Product from '../pages/Product';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ Product } />
      </Switch>
    );
  }
}
