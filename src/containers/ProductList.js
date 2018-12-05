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
      products: [],
    };
  }

  async componentDidMount() {
    const { category, page } = this.props;
    if (!!category && !!page) {
      const res = await api.get('/products', {
        params: {
          category,
          _embed: 'options',
          _page: page,
          _limit: this.state.productsPerPage,
        },
      });
      this.setState({
        products: res.data,
        loading: false,
        currentCategory: category,
        currentPage: page,
      });
    } else if (!category && !!page) {
      const res = await api.get('/products', {
        params: {
          _embed: 'options',
          _page: page,
          _limit: this.state.productsPerPage,
        },
      });
      this.setState({
        products: res.data,
        loading: false,
        currentCategory: category,
        currentPage: page,
      });
    } else if (!!category && !page) {
      const res = await api.get('/products', {
        params: {
          category,
          _embed: 'options',
        },
      });
      this.setState({
        products: res.data,
        loading: false,
        currentCategory: category,
        currentPage: page,
      });
    } else {
      const res = await api.get('/products', {
        params: {
          _embed: 'options',
        },
      });
      this.setState({
        products: res.data,
        loading: false,
        currentCategory: category,
        currentPage: page,
      });
    }
  }

  render() {
    const { products, currentPage, productsPerPage } = this.state;
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
        />
      </div>
    );
  }
}
