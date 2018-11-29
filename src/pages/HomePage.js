import React, { Component } from 'react';
import ProductList from '../containers/ProductList';
import Layout from '../components/Layout';

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <ProductList />
      </Layout>
    );
  }
}
