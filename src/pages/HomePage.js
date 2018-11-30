import React, { Component } from 'react';
import ProductList from '../containers/ProductList';
import Layout from '../components/Layout';

export default class HomePage extends Component {
  render() {
    const { location } = this.props;
    const p = new URLSearchParams(location.search);
    const category = p.get('category');
    return (
      <Layout>
        <ProductList key={category} category={category} />
      </Layout>
    );
  }
}
