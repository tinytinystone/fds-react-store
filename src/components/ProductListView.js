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
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      productsPerPage: 8,
    };
  }
  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id),
    });
  };
  render() {
    const { products } = this.props;
    const { currentPage, productsPerPage } = this.state;

    const indexOfLastItem = currentPage * productsPerPage;
    const indexOfFirstItem = indexOfLastItem - productsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const renderProducts = currentProducts.map(p => {
      return (
        <article key={p.id} className={s.listItem}>
          <Link to={`/product/${p.id}`}>
            <img src={p.imgUrl} alt={p.title} />
            <h3>{p.title}</h3>
            <p className={s.price}>{p.price} 원</p>
          </Link>
        </article>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <React.Fragment>
        <section className={s.list}>{renderProducts}</section>
        <ul className={s.pageNumbers}>{renderPageNumbers}</ul>
      </React.Fragment>
    );
  }
}

export default withLoading(ProductListView);
