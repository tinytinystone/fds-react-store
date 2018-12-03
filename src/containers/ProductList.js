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
    });
  }

  render() {
    const { products } = this.state;
    const productsList = products.map(p => ({
      title: p.title,
      id: p.id,
      imgUrl: p.mainImgUrl,
      price: p.options[0].price,
    }));
    console.log(productsList);
    return (
      <div>
        <ProductListView products={productsList} />
      </div>
    );
  }
}
