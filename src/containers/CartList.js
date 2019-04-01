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
      selectedCartItemIds: [],
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
    console.log(cartItemId);
    // if (e.target.checked) {
    //   const cartItemId = parseInt(e.target.value);
    //   const selectedItems = [...this.state.selectedItems, cartItemId];
    //   this.setState({
    //     selectedItems,
    //   });
    // }
    if (this.state.selectedCartItemIds.includes(cartItemId)) {
      console.log('있으면 빼고');
      const newArr = this.state.selectedCartItemIds.filter(
        item => item !== cartItemId
      );
      this.setState({
        selectedCartItemIds: newArr,
      });
    } else {
      console.log('없으면 넣고');
      this.setState(prevState => ({
        selectedCartItemIds: [...prevState.selectedCartItemIds, cartItemId],
      }));
    }
  };
  goToOrder = () => {
    // FIXME
    // const newProductsInCarts = this.state.productsInCarts.filter(
    //   p => p.checked === true
    // );
    // const newArr = [];
    // for (const p of newProductsInCarts) {
    //   newArr.push({
    //     id: p.cartId,
    //     quantity: p.quantity,
    //   });
    // }
    const newArr = this.state.selectedCartItemIds.map(id => {
      const currentCartItem = this.props.cartItems.find(item => item.id === id);
      return {
        id,
        quantity: currentCartItem.quantity,
      };
    });
    this.props.orderCartItems(newArr, this.props.cartItems);
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
        handleCheckChange={this.handleCheckChange}
        goToOrder={this.goToOrder}
        selectedCartItemIds={this.state.selectedCartItemIds}
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
