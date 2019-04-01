import React from 'react';
import s from './CartItem.module.scss';

export default function CartItem({
  cartItem,
  deleteItem,
  onCheckChange,
  checked,
  quantity,
  onQtyChange,
}) {
  const { cartId, title, price, mainImgUrl, optionTitle } = cartItem;
  return (
    <article className={s.cartItem}>
      <div className={s.imgContainer}>
        <img src={mainImgUrl} alt={title} className={s.cartItemImg} />
      </div>
      <div className={s.container}>
        <h3 className={s.title}>{title}</h3>
        <span className={s.price}>
          {price * quantity} <span>원</span>
        </span>
        <span className={s.option}>{optionTitle}</span>
      </div>
      <div className={s.checkContainer}>
        <input
          type="checkbox"
          checked={checked}
          value={cartId}
          name="isSelectedItem"
          onChange={() => onCheckChange(cartId)}
          className={s.checkbox}
        />
      </div>
      <div className={s.bottom}>
        <input
          type="number"
          name="quantity"
          value={quantity}
          className={s.quantity}
          onChange={e => onQtyChange(cartId, parseInt(e.target.value))}
        />
        <button className={s.button} onClick={e => deleteItem(cartId)}>
          삭제
        </button>
      </div>
    </article>
  );
}
