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
  componentDidMount() {
    this.refreshCartItems();
  }
  refreshCartItems = async () => {
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
  };
  orderCartItems = async (cartItemId, quantity, orderId) => {
    await api.patch('/cartItems/' + cartItemId, {
      ordered: true,
      quantity,
      orderId,
    });
  };
  deleteItem = async cartItemId => {
    this.setState({
      loading: true,
    });
    await api.delete('cartItems/' + cartItemId);
    alert('해당 항목이 삭제 되었습니다.');
    this.refreshCartItems();
  };
  handleOrderClick = async arr => {
    this.setState({ loading: true });
    const {
      data: { id: orderId },
    } = await api.post('/orders', {
      orderTime: Date.now(), // 현재 시각을 나타내는 정수
    });
    arr.forEach(idAndQuantity => {
      this.state.carts.forEach(cart => {
        if (cart.id === parseInt(idAndQuantity.id)) {
          this.orderCartItems(
            cart.id,
            parseInt(idAndQuantity.quantity),
            orderId
          );
        }
      });
    });
    alert('주문이 완료 되었습니다.');
    this.setState({
      carts: [],
      products: [],
      loading: false,
    });
  };
  render() {
    const { carts, products, loading } = this.state;
    return (
      <CartListView
        loading={loading}
        carts={carts}
        products={products}
        handleOrderClick={this.handleOrderClick}
        deleteItem={this.deleteItem}
      />
    );
  }
}
