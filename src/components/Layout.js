import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <h1>쇼핑몰</h1>
        </Link>
        <Link to="/login">로그인</Link>
        {this.props.children}
        <footer>footer</footer>
      </React.Fragment>
    );
  }
}
