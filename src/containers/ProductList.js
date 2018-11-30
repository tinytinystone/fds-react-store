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
    // const category = 'plant';
    const { data: products } = await api.get('/products');
    if (category == null) {
      this.setState({
        products,
        loading: false,
      });
    } else {
      // const { products } = this.state;
      console.log(products);
      const filteredProducts = products.filter(p => p.category === category);
      this.setState({
        currentCategory: category,
        products: filteredProducts,
        loading: false,
      });
    }
  }

  render() {
    const { products } = this.state;
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
