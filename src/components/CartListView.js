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
  render() {
    const {
      productsInCart,
      deleteItem,
      handleCheckChange,
      cartItemCheckedPerId,
      handleQtyChange,
      cartItemQauntityPerId,
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
              checked={cartItemCheckedPerId[p.cartId]}
              quantity={cartItemQauntityPerId[p.cartId]}
              onQtyChange={handleQtyChange}
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
