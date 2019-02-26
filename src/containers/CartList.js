import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import api from '../api';
import * as actions from '../actions';
import { getCartItems, getProducts } from '../reducers';
import { connect } from 'react-redux';

class CartList extends Component {
  componentDidMount() {
    this.props.refreshCartItems();
  }
  render() {
    const {
      cartItems,
      productsInCart,
      isFetching,
      deleteCartItem,
      orderCartItems,
      ...rest
    } = this.props;
    if (isFetching && !cartItems.length) {
      return <p>Loading...</p>;
    }
    return (
      <CartListView
        productsInCart={productsInCart}
        cartItems={cartItems}
        carts={cartItems}
        handleOrderClick={orderCartItems}
        deleteItem={deleteCartItem}
        {...rest}
      />
    );
  }
}

const getCartDetails = state => {
  const cartItems = getCartItems(state);
  const products = getProducts(state, 'cartList');
  return cartItems.map(cartItem => {
    const { id, quantity, option } = cartItem;
    const { mainImgUrl, title } = products.find(
      product => cartItem.option.productId === product.id
    );
    return {
      ...state,
      cartId: id,
      title,
      price: option.price,
      mainImgUrl,
      quantity,
      optionTitle: option.title,
      productId: option.productId,
      checked: true,
    };
  });
};

const mapStateToProps = state => {
  const isFetching =
    state.cartItems.cartList.isFetching || state.products.isFetching;
  return {
    isFetching,
    cartItems: !isFetching && getCartItems(state),
    productsInCart: !isFetching && getCartDetails(state),
  };
};

CartList = connect(
  mapStateToProps,
  actions
)(CartList);

export default CartList;
