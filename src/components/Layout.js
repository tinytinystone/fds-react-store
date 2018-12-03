import React, { Component } from 'react';

import Header from '../containers/Header';
import Navigation from '../containers/Navigation';
import s from './Layout.module.scss';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Navigation />
        <main className={s.main}>{this.props.children}</main>
        <footer className={s.footer}>
          <p>© 2018 PUFFIN</p>
        </footer>
      </React.Fragment>
    );
  }
}
