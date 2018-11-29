import React, { Component } from 'react';

import Header from '../containers/Header';
import Navigation from '../containers/Navigation';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Navigation />
        {this.props.children}
        <footer>footer</footer>
      </React.Fragment>
    );
  }
}
