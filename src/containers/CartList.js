import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import * as actions from '../actions';
import { getCartItems, getCartDetails } from '../reducers';
import { connect } from 'react-redux';

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemCheckedPerId: {},
      cartItemQauntityPerId: {},
    };
  }
  componentDidMount() {
    this.props.refreshCartItems();
  }
  componentDidUpdate(prevProps) {
    // 컴포넌트가 업데이트 될때 실행되는 라이프사이클 훅
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({
        cartItemCheckedPerId: this.props.cartItems.reduce(
          (acc, ci) => ({
            ...acc,
            [ci.id]: true,
          }),
          {}
        ),
        cartItemQauntityPerId: this.props.cartItems.reduce(
          (acc, ci) => ({
            ...acc,
            [ci.id]: ci.quantity,
          }),
          {}
        ),
      });
    }
  }
  handleCheckChange = cartItemId => {
    this.setState(prevState => ({
      cartItemCheckedPerId: {
        ...prevState.cartItemCheckedPerId,
        [cartItemId]: !prevState.cartItemCheckedPerId[cartItemId],
      },
    }));
  };
  handleQtyChange = (cartItemId, qty) => {
    this.setState(prevState => ({
      cartItemQauntityPerId: {
        ...prevState.cartItemQauntityPerId,
        [cartItemId]: qty,
      },
    }));
  };
  goToOrder = async () => {
    const { cartItemCheckedPerId, cartItemQauntityPerId } = this.state;
    const arr = Object.keys(cartItemCheckedPerId).filter(
      id => cartItemCheckedPerId[id]
    );
    const newArr = arr.map(id => {
      return {
        id,
        quantity: cartItemQauntityPerId[id],
      };
    });
    await this.props.orderCartItems(newArr, this.props.cartItems);
    await this.props.refreshCartItems();
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
        handleCheckChange={this.handleCheckChange}
        handleQtyChange={this.handleQtyChange}
        goToOrder={this.goToOrder}
        cartItemCheckedPerId={this.state.cartItemCheckedPerId}
        cartItemQauntityPerId={this.state.cartItemQauntityPerId}
        changeQuantity={this.changeQuantity}
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
