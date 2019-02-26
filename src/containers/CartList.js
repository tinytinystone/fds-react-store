import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import api from '../api';
import * as actions from '../actions';
import { getCartItems, getProducts } from '../reducers';
import { connect } from 'react-redux';

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };
  }
  componentDidMount() {
    this.props.refreshCartItems();
  }
  findSelectedItems = e => {
    if (e.target.checked) {
      const cartItemId = parseInt(e.target.value);
      const selectedItems = [...this.state.selectedItems, cartItemId];
      this.setState({
        selectedItems,
      });
    }
  };
  handleQtyChange = e => {
    const quantity = parseInt(e.target.value);
    this.setState({
      quantity,
    });
  };
  handleCreateCartItem = async (optionId, quantity) => {
    const { createCartItem } = this.props;
    createCartItem(parseInt(optionId), parseInt(quantity));
  };
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
        findSelectedItems={this.findSelectedItems}
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
