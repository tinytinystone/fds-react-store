import React, { Component } from 'react';

import ProductListView from '../components/ProductListView';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProducts, getTotalCount, getIsFetchingProducts } from '../reducers';
import * as actions from '../actions';

class ProductList extends Component {
  componentDidMount() {
    const { page, category, productsPerPage, fetchProducts } = this.props;
    fetchProducts(category, page, productsPerPage);
  }
  countPageNumber() {
    const { totalCount, productsPerPage } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCount / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  mapProductList(products) {
    return products.map(p => ({
      title: p.title,
      id: p.id,
      imgUrl: p.mainImgUrl,
      price: p.options && p.options[0].price,
    }));
  }
  render() {
    const { products, page, category, isFetching, ...rest } = this.props;

    const productsList = this.mapProductList(products);
    const pageNumbers = this.countPageNumber();

    return (
      <div>
        <ProductListView
          productList={productsList}
          currentPage={page}
          currentCategory={category}
          pageNumbers={pageNumbers}
          isFetching={isFetching}
          {...rest}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => {
  const p = new URLSearchParams(location.search);
  const page = p.get('_page');
  const category = p.get('category') || 'all';

  return {
    page,
    category,
    products: getProducts(state, category),
    productsPerPage: 4,
    totalCount: getTotalCount(state, category),
    isFetching: getIsFetchingProducts(state, category),
  };
};

ProductList = withRouter(
  connect(
    mapStateToProps,
    actions
  )(ProductList)
);

export default ProductList;
