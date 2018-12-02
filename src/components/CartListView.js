import React, { Component } from 'react';
import s from './CartListView.module.scss';

export default class CartListView extends Component {
  static defaultProps = {
    carts: [
      {
        id: 1,
        userId: 2,
        optionId: 1,
        quantity: 2,
        ordered: true,
        orderId: 1,
      },
    ],
    products: [
      { id: null, title: '', description: '', mainImgUrl: '', options: [] },
    ],
  };
  render() {
    const { carts, products, handleClick } = this.props;
    return (
      <section>
        {carts.map(c => {
          const { quantity, option } = c;
          const { mainImgUrl, title } = products.find(
            p => c.option.productId === p.id
          );
          return (
            <article key={c.id} className={s.cartItem}>
              <h3>{title}</h3>
              <img src={mainImgUrl} alt={title} />
              <span>{option.price}</span>
              <span>{option.title}</span>
              <span>{quantity}</span>
            </article>
          );
        })}
        <button onClick={handleClick}>주문하기</button>
      </section>
    );
  }
}
