import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import api from '../api';

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      carts: [
        // {
        //   id: 1,
        //   userId: 2,
        //   optionId: 1,
        //   quantity: 2,
        //   ordered: false
        // }
      ],
      products: [],
    };
  }
  async componentDidMount() {
    const { data: cartItems } = await api.get('cartItems/', {
      params: {
        ordered: false,
        _expand: 'option',
      },
    });
    const p = new URLSearchParams();
    cartItems.forEach(element => {
      p.append('id', element.option.productId);
    });
    const { data: products } = await api.get('products', {
      params: p,
    });
    this.setState({
      carts: cartItems,
      products,
      loading: false,
    });
  }
  orderCartItems = async (cartItemId, orderId) => {
    await api.patch('/cartItems/' + cartItemId, {
      ordered: true,
      orderId,
    });
  };
  handleClick = async () => {
    const {
      data: { id: orderId },
    } = await api.post('/orders', {
      orderTime: Date.now(), // 현재 시각을 나타내는 정수
    });
    this.state.carts.forEach(c => {
      this.orderCartItems(c.id, orderId);
    });
    alert('주문이 완료 되었습니다.');
    this.setState({
      carts: [],
      products: [],
    });
  };
  render() {
    const { carts, products } = this.state;
    return (
      <div>
        <CartListView
          carts={carts}
          products={products}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}
