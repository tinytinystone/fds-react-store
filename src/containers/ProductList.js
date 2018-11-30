import React, { Component } from 'react';
import ProductListView from '../components/ProductListView';
import api from '../api';

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      loading: true,
      products: [],
    };
  }

  async componentDidMount() {
    const { category } = this.props;
    // if (this.state.currentCategory !== goCategory) {
    const { data: products } = await api.get('/products', {
      params: {
        category,
      },
    });
    this.setState({
      products,
      loading: false,
      currentCategory: category,
    });
    // } else {
    //   const { data: products } = await api.get('/products');
    //   this.setState({
    //     products,
    //     loading: false,
    //   });
    // }
  }

  render() {
    const { products } = this.state;
    const { category } = this.props;
    const productsList = products.map(p => ({
      title: p.title,
      id: p.id,
      imgUrl: p.mainImgUrl,
    }));
    return (
      <div>
        <ProductListView products={productsList} />
      </div>
    );
  }
}
