import React, { Component } from 'react';
import s from './CartListView.module.scss';
import withLoading from '../hoc/withLoading';
import CartItem from './CartItem';

class CartListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInCarts: props.productsInCart,
    };
  }
  changeQuantity = (cartId, quantity) => {
    const { productsInCarts } = this.state;
    const newProductsInCarts = productsInCarts.map(p => {
      if (p.cartId === cartId) {
        p.quantity = quantity;
      }
      return p;
    });
    this.setState({ productsInCarts: newProductsInCarts });
  };
  render() {
    const {
      productsInCart,
      deleteItem,
      handleCheckChange,
      selectedCartItemIds,
    } = this.props;
    return (
      <section className={s.cart}>
        {productsInCart &&
          productsInCart.map(p => (
            <CartItem
              key={p.cartId}
              cartItem={p}
              deleteItem={deleteItem}
              onCheckChange={handleCheckChange}
              checked={selectedCartItemIds.includes(p.cartId)}
            />
          ))}
        <button className={s.button} onClick={this.props.goToOrder}>
          주문하기
        </button>
      </section>
    );
  }
}

export default withLoading(CartListView);
