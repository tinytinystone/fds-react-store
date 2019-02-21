import React, { Component } from 'react';
import ProductListView from '../components/ProductListView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProducts, getTotalCounts } from '../reducers';
import * as actions from '../actions';

class ProductList extends Component {
  componentDidMount() {
    const { page, category, productsPerPage, fetchProducts } = this.props;
    fetchProducts(page, category, productsPerPage);
  }

  countPageNumber() {
    const { totalCount, productsPerPage } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCount / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  render() {
    const {
      products,
      page,
      productsPerPage,
      category,
      totalCount,
    } = this.props;
    const productsList = products.map(p => ({
      title: p.title,
      id: p.id,
      imgUrl: p.mainImgUrl,
      price: p.options[0].price,
    }));
    const pageNumbers = this.countPageNumber();
    return (
      <div>
        <ProductListView
          products={productsList}
          currentPage={page}
          productsPerPage={productsPerPage}
          totalProducts={totalCount}
          currentCategory={category}
          loading={false}
          pageNumbers={pageNumbers}
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
    totalCount: state.products.listByCategory[category].totalCount,
  };
};

ProductList = withRouter(
  connect(
    mapStateToProps,
    actions
  )(ProductList)
);

export default ProductList;
