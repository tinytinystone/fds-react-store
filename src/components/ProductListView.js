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
  };
  constructor(props) {
    super(props);
    const { products, currentPage, productsPerPage } = this.props;

    const indexOfLastItem = currentPage * productsPerPage;
    const indexOfFirstItem = indexOfLastItem - productsPerPage;

    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    this.state = {
      currentProducts,
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
    return (
      <Link to={`/products?_page=${number}`} key={number}>
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      </Link>
    );
  };
  render() {
    const { currentProducts, pageNumbers } = this.state;
    return (
      <React.Fragment>
        <section className={s.list}>
          {currentProducts.map(p => this.renderItems(p))}
        </section>
        <ul className={s.pageNumbers}>
          {pageNumbers.map(number => this.renderPages(number))}
        </ul>
      </React.Fragment>
    );
  }
}

export default withLoading(ProductListView);
