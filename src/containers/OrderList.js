import React, { Component } from 'react';
import OrderListView from '../components/OrderListView';
import api from '../api';
import { withUser } from '../contexts/UserContext';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
      options: [],
    };
  }
  async componentDidMount() {
    const { data: orders } = await api.get('/orders', {
      params: {
        _embed: 'cartItems',
      },
    });
    const p = new URLSearchParams();
    orders.forEach(o => {
      o.cartItems.forEach(c => {
        p.append('id', c.optionId);
      });
    });
    const { data: optionList } = await api.get('/options/?_expand=product', {
      params: p,
    });
    this.setState({
      orders: orders,
      options: optionList,
      loading: false,
    });
  }
  render() {
    return <OrderListView {...this.state} />;
  }
}

export default withUser(OrderList);
