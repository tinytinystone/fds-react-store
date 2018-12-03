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
  renderItem(cartItem) {
    const { products } = this.props;
    const { quantity, option } = cartItem;
    const { mainImgUrl, title } = products.find(
      p => cartItem.option.productId === p.id
    );
    return (
      <article key={cartItem.id} className={s.cartItem}>
        <img src={mainImgUrl} alt={title} />
        <h3>{title}</h3>
        <span>{option.price}</span>
        <span>{option.title}</span>
        <span>{quantity}</span>
        <button
          onClick={e => {
            this.props.deleteItem(cartItem.id);
          }}
        >
          삭제
        </button>
      </article>
    );
  }
  render() {
    const { carts, handleClick } = this.props;
    return (
      <section>
        {carts.map(c => this.renderItem(c))}
        <button onClick={handleClick}>주문하기</button>
      </section>
    );
  }
}
