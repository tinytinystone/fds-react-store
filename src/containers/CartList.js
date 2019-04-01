import React, { Component } from 'react';
import CartListView from '../components/CartListView';
import * as actions from '../actions';
import { getCartItems, getCartDetails } from '../reducers';
import { connect } from 'react-redux';

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCartItemIds: [],
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
        selectedCartItemIds: this.props.cartItems.map(ci => ci.id),
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
  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps');
  //   return {
  //     selectedCartItemIds: props.cartItems.map(ci => ci.id),
  //   };
  // }
  handleCheckChange = cartItemId => {
    if (this.state.selectedCartItemIds.includes(cartItemId)) {
      const newArr = this.state.selectedCartItemIds.filter(
        item => item !== cartItemId
      );
      this.setState({
        selectedCartItemIds: newArr,
      });
    } else {
      this.setState(prevState => ({
        selectedCartItemIds: [...prevState.selectedCartItemIds, cartItemId],
      }));
    }
  };
  handleQtyChange = (cartItemId, qty) => {
    this.setState(prevState => ({
      cartItemQauntityPerId: {
        ...prevState.cartItemQauntityPerId,
        [cartItemId]: qty,
      },
    }));
  };
  goToOrder = () => {
    const newArr = this.state.selectedCartItemIds.map(id => {
      return {
        id,
        quantity: this.state.cartItemQauntityPerId[id],
      };
    });
    this.props.orderCartItems(newArr, this.props.cartItems);
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
        selectedCartItemIds={this.state.selectedCartItemIds}
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
