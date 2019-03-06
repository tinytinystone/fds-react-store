import React, { Component } from 'react';
import ProductDetail from '../containers/ProductDetail';
import Layout from '../components/Layout';

export default class ProductPage extends Component {
  render() {
    return (
      <Layout>
        <ProductDetail />
      </Layout>
    );
  }
}
