import React, { Component } from 'react';
import CartList from '../containers/CartList';
import Layout from '../components/Layout';

export default class CartPage extends Component {
  render() {
    return (
      <Layout>
        <CartList />
      </Layout>
    );
  }
}
