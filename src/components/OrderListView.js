// import s from './CartListView.module.scss';
import React, { Component } from 'react';

export default class OrderListView extends Component {
  render() {
    const { orders, options } = this.props;
    return (
      <section>
        {orders.map(order => {
          const { orderTime, cartItems } = order;
          return (
            <section key={order.id}>
              <h3>{orderTime}</h3>
              {cartItems.map(cartItem => {
                const { title, price, product } = options.find(
                  option => option.id === cartItem.optionId
                );
                return (
                  <article key={cartItem.id}>
                    <p>{title}</p>
                    <img src={product.mainImgUrl} alt={product.title} />
                    <span>{price}</span>
                    <span>{product.title}</span>
                  </article>
                );
              })}
            </section>
          );
        })}
      </section>
    );
  }
}
