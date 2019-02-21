import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductListView.module.scss';

import withLoading from '../hoc/withLoading';
import ProductItem from './ProductItem';
import ProductListPage from './ProductListPage';

class ProductListView extends Component {
  // static defaultProps = {
  //   // 서버로부터 받아온 상품 목록 데이터
  //   products: [
  //     // id: 1,
  //     // title: '스웨터',
  //     // imgUrl: '...',
  //   ],
  //   currentPage: 1,
  //   productsPerPage: 0,
  //   totalProducts: 0,
  // };
  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: [],
    };
  }
  componentDidMount() {
    const { productsPerPage, totalProducts } = this.props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    this.setState({
      pageNumbers,
    });
  }
  render() {
    const { products, currentCategory, pageNumbers } = this.props;
    return (
      <React.Fragment>
        <section className={s.list}>
          {products.map(p => {
            return <ProductItem p={p} />;
          })}
        </section>
        <ul className={s.pageNumbers}>
          {pageNumbers.map(number => {
            return (
              <ProductListPage
                number={number}
                currentCategory={currentCategory}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default withLoading(ProductListView);
