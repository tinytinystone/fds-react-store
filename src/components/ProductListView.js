import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProductList from '../containers/ProductList';
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
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <div>{p.id}</div>
            <Link to={`/product/${p.id}`}>
              <div>{p.title}</div>
            </Link>
            <img src={p.imgUrl} alt={p.title} />
          </li>
        ))}
      </ul>
    );
  }
}

export default withLoading(ProductListView);
