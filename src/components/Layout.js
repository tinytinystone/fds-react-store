import React, { Component } from 'react';

import Header from '../containers/Header';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <footer>footer</footer>
      </React.Fragment>
    );
  }
}
