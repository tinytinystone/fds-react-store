import React, { Component } from 'react';
import ProductList from '../containers/ProductList';
import Layout from '../components/Layout';

export default class HomePage extends Component {
  render() {
    const { location } = this.props;
    const p = new URLSearchParams(location.search);
    const category = p.get('category');
    const page = p.get('page');
    return (
      <Layout>
        <ProductList
          key={category + page}
          category={category}
          page={page}
          currentLocation={location.pathname}
        />
      </Layout>
    );
  }
}
