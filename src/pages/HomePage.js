import React, { Component } from 'react';
import ProductList from '../containers/ProductList';
import Layout from '../components/Layout';

export default class HomePage extends Component {
  render() {
    const { match } = this.props;
    const category = match.params.category;
    return (
      <Layout>
        <ProductList category={category} />
      </Layout>
    );
  }
}
