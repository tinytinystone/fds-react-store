import React from 'react';
import s from './CartListView.module.scss';

export default function CartItem({ cartItem, deleteItem, findSelectedItems }) {
  const { cartId, title, price, mainImgUrl, quantity, optionTitle } = cartItem;
  return (
    <article className={s.cartItem}>
      <img src={mainImgUrl} alt={title} />
      <h3>{title}</h3>
      <span>{price * quantity}</span>
      <span>{optionTitle}</span>
      <input
        type="checkbox"
        defaultChecked={true}
        value={cartId}
        name="isSelectedItem"
        onChange={findSelectedItems}
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        readOnly={true}
        // onChange={e =>
        //   this.changeQuantity(parseInt(cartId), parseInt(e.target.value))
        // }
      />
      <button onClick={e => deleteItem(cartId)}>삭제</button>
    </article>
  );
}
