import React, { Component } from 'react';
import ProductListView from '../components/ProductListView';
import api from '../api';

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      currentPage: '',
      productsPerPage: 4,
      loading: true,
      totalProducts: 0,
      products: [],
    };
  }

  async componentDidMount() {
    const { category, page } = this.props;
    if (!!category && !!page) {
      const res = await api.get(
        `/products/?category=${category}&_embed=options&_page=${page}&_limit=${
          this.state.productsPerPage
        }`
      );
      this.setState({
        products: res.data,
        currentCategory: category,
        currentPage: page,
        totalProducts: parseInt(res.headers['x-total-count']),
        loading: false,
      });
    } else if (!category && !!page) {
      const res = await api.get(
        `/products/?_embed=options&_page=${page}&_limit=${
          this.state.productsPerPage
        }`
      );
      this.setState({
        products: res.data,
        currentCategory: category,
        currentPage: page,
        totalProducts: parseInt(res.headers['x-total-count']),
        loading: false,
      });
    } else if (!!category && !page) {
      const res = await api.get(
        `/products/?category=${category}&_embed=options&_page=1&_limit=${
          this.state.productsPerPage
        }`
      );
      this.setState({
        products: res.data,
        currentCategory: category,
        currentPage: page,
        totalProducts: parseInt(res.headers['x-total-count']),
        loading: false,
      });
    } else {
      const res = await api.get(
        `/products/?_embed=options&_page=$1&_limit=${
          this.state.productsPerPage
        }`
      );
      this.setState({
        products: res.data,
        currentCategory: category,
        currentPage: page,
        totalProducts: parseInt(res.headers['x-total-count']),
        loading: false,
      });
    }
  }

  render() {
    const {
      products,
      currentPage,
      productsPerPage,
      totalProducts,
      currentCategory,
      loading,
    } = this.state;
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
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}
          currentCategory={currentCategory}
          loading={loading}
        />
      </div>
    );
  }
}
