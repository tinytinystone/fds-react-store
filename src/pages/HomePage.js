import React, { Component } from 'react';
import ProductList from '../containers/ProductList';
import Layout from '../components/Layout';

export default class HomePage extends Component {
  render() {
    const p = new URLSearchParams(this.props.location.search);
    return (
      <Layout>
        <ProductList key={p.toString()} />
      </Layout>
    );
  }
}
