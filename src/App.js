import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import { UserProvider } from './contexts/UserContext';

import s from './App.module.scss';
import RegisterPage from './pages/RegisterPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <div className={s.wrap}>
            <Switch>
              {/* exact prop이 있을 때: 주소가 정확히 일치해야만 페이지가 그려짐.
        exact prop이 없을 때: 주소가 path로 시작하면 페이지가 그려짐. */}
              {/* <Route exact path="/" component={HomePage} /> */}
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route exact path="/product" component={HomePage} />
              <Route path="/product/:productId" component={ProductPage} />
              <Redirect from="/" to="/product" />
            </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    );
  }
}
