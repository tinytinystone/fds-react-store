import React, { Component } from 'react';
import ProductListView from '../components/ProductListView';
import api from '../api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dispatch } from 'rxjs/internal/observable/range';
import { getProducts, getTotalProduct } from '../reducers';
import * as actions from '../actions';

class ProductList extends Component {
  componentDidMount() {
    const { page, category, productsPerPage, fetchProducts } = this.props;
    fetchProducts(page, category, productsPerPage);
  }

  render() {
    const { products, page, productsPerPage, category } = this.props;
    const totalProducts = products.length;
    const productsList = products.map(p => ({
      title: p.title,
      id: p.id,
      imgUrl: p.mainImgUrl,
      price: p.options[0].price,
    }));
    return (
      <div>
        <ProductListView
          products={productsList}
          currentPage={page}
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}
          currentCategory={category}
          loading={false}
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
  };
};

ProductList = withRouter(
  connect(
    mapStateToProps,
    actions
  )(ProductList)
);

export default ProductList;
