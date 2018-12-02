import React, { Component } from 'react';
import OrderListView from '../components/OrderListView';
import api from '../api';

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
    const { orders, options } = this.state;
    const orderList = orders.map(order => {
      const { id, orderTime, cartItems } = order;
      const result = { orderId: id, orderTime, orderDetail: [] };
      cartItems.map(cartItem => {
        const { title, price, product } = options.find(
          option => option.id === cartItem.optionId
        );
        return result.orderDetail.push({
          title: product.title,
          mainImg: product.mainImgUrl,
          optionTitle: title,
          price,
          quantity: cartItem.quantity,
        });
      });
      console.log(result);
      return result;
    });
    return <OrderListView orderList={orderList} />;
  }
}

export default OrderList;
