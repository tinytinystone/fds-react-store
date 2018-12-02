import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductListView.module.scss';

import withLoading from '../hoc/withLoading';

class ProductListView extends Component {
  static defaultProps = {
    // 서버로부터 받아온 상품 목록 데이터
    products: [
      // id: 1,
      // title: '스웨터',
      // imgUrl: '...',
    ],
  };
  render() {
    const { products } = this.props;
    return (
      <section className={s.list}>
        {products.map(p => (
          <article key={p.id} className={s.listItem}>
            <Link to={`/product/${p.id}`}>
              <h3>{p.title}</h3>
              <img src={p.imgUrl} alt={p.title} />
            </Link>
          </article>
        ))}
      </section>
    );
  }
}

export default withLoading(ProductListView);
