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
    currentPage: 1,
    productsPerPage: 0,
    totalProducts: 0,
  };
  constructor(props) {
    super(props);
    const {
      products,
      currentPage,
      productsPerPage,
      totalProducts,
    } = this.props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    this.state = {
      pageNumbers,
    };
  }

  renderItems = p => {
    return (
      <article key={p.id} className={s.listItem}>
        <Link to={`/product/${p.id}`}>
          <img src={p.imgUrl} alt={p.title} />
          <h3>{p.title}</h3>
          <p className={s.price}>{p.price} 원</p>
        </Link>
      </article>
    );
  };

  renderPages = number => {
    const { currentCategory } = this.props;
    const noCategoryLink = `/product/?_page=${number}`;
    const withCategoryLink = `/product/?category=${currentCategory}&_page=${number}`;
    if (currentCategory == null) {
      return (
        <Link to={noCategoryLink}>
          <li key={number} id={number} onClick={this.handleClick}>
            {number}
          </li>
        </Link>
      );
    } else {
      return (
        <Link to={withCategoryLink}>
          <li key={number} id={number} onClick={this.handleClick}>
            {number}
          </li>
        </Link>
      );
    }
  };
  render() {
    const {
      products,
      currentPage,
      productsPerPage,
      totalProducts,
      currentCategory,
    } = this.props;
    const { currentProducts, pageNumbers } = this.state;
    return (
      <React.Fragment>
        <section className={s.list}>
          {products.map(p => this.renderItems(p))}
        </section>
        <ul className={s.pageNumbers}>
          {pageNumbers.map(number => this.renderPages(number))}
        </ul>
      </React.Fragment>
    );
  }
}

export default withLoading(ProductListView);
