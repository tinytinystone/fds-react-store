import React, { Component } from 'react';
import ProductDetailView from '../components/ProductDetailView';
import api from '../api';

export default class ProductDetail extends Component {
  static defaultProps = {
    // 표시해주어야 하는 상품의 id
    productId: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: null,
      title: '',
      description: '',
      mainImgUrl: '',
      detailImgUrls: [''],
      options: [
        {
          id: 1,
          productId: 1,
          title: 'Medium',
          price: 30000,
        },
      ],
    };
  }
  async componentDidMount() {
    const { data: product } = await api.get(
      'products/' + this.props.productId,
      {
        params: {
          _embed: 'options',
        },
      }
    );
    this.setState({
      ...product,
      loading: false,
    });
  }
  handleCreateCartItem = async (optionId, quantity) => {
    await api.post('cartItems', {
      optionId,
      quantity,
      ordered: false,
    });
    alert('장바구니에 담겼습니다.');
  };
  render() {
    return (
      <div>
        <ProductDetailView
          onCreateCartItem={this.handleCreateCartItem}
          {...this.state}
        />
      </div>
    );
  }
}
