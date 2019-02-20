import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';

import { Provider } from 'react-redux';

import s from './Root.module.scss';
import RegisterPage from '../pages/RegisterPage';
import OrderPage from '../pages/OrderPage';

const Root = ({ store }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={s.wrap}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/product" component={HomePage} />
            <Route path="/product/:productId" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/order" component={OrderPage} />
            <Redirect from="/" to="/product" />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default Root;
