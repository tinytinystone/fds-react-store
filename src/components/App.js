import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import RegisterPage from '../pages/RegisterPage';
import OrderPage from '../pages/OrderPage';

import { connect } from 'react-redux';

import * as actions from '../actions';
import { getUsers } from '../reducers';

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.refreshUsers();
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/product" component={HomePage} />
          <Route path="/product/:productId" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order" component={OrderPage} />
          <Redirect from="/" to="/product" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: getUsers(state),
  };
};

App = connect(
  mapStateToProps,
  actions
)(App);

export default App;
