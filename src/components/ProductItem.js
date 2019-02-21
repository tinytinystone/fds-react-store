import React from 'react';
import s from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  return (
    <article className={s.listItem}>
      <Link to={`/product/${product.id}`}>
        <img src={product.imgUrl} alt={product.title} />
        <h3>{product.title}</h3>
        <p className={s.price}>{product.price} 원</p>
      </Link>
    </article>
  );
}
