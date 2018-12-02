import React, { Component } from 'react';
import OrderList from '../containers/OrderList';
import Layout from '../components/Layout';

export default class OrderPage extends Component {
  render() {
    return (
      <Layout>
        <OrderList />
      </Layout>
    );
  }
}
