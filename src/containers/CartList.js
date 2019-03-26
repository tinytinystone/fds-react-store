import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import api from '../api';
import * as actions from '../actions';
import { getCartItems, getCartDetails } from '../reducers';
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

const mapStateToProps = state => {
  const isFetching = state.cartItems.listByCartItems.isFetching;
  return {
    isFetching,
    cartItems: getCartItems(state),
    productsInCart: getCartDetails(state),
  };
};

CartList = connect(
  mapStateToProps,
  actions
)(CartList);

export default CartList;
