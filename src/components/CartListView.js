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
  goToOrder = () => {
    const newProductsInCarts = this.state.productsInCarts.filter(
      p => p.checked === true
    );
    const newArr = [];
    for (const p of newProductsInCarts) {
      newArr.push({
        id: p.cartId,
        quantity: p.quantity,
      });
    }
    this.props.handleOrderClick(newArr, this.props.cartItems);
  };
  render() {
    const { productsInCart, deleteItem, findSelectedItems } = this.props;
    return (
      <section className={s.cart}>
        {productsInCart &&
          productsInCart.map(p => (
            <CartItem
              key={p.cartId}
              cartItem={p}
              deleteItem={deleteItem}
              findSelectedItems={findSelectedItems}
            />
          ))}
        <button className={s.button} onClick={this.goToOrder}>
          주문하기
        </button>
      </section>
    );
  }
}

export default withLoading(CartListView);
