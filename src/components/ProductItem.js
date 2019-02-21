import React from 'react';
import s from './ProductListView';
import { Link } from 'react-router-dom';

export default function ProductItem({ p }) {
  return (
    <article key={p.id} className={s.listItem}>
      <Link to={`/product/${p.id}`}>
        <img src={p.imgUrl} alt={p.title} />
        <h3>{p.title}</h3>
        <p className={s.price}>{p.price} 원</p>
      </Link>
    </article>
  );
}
