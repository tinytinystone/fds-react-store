import React, { Component } from 'react';
import ProductDetailView from '../components/ProductDetailView';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions';
import { getProducts } from '../reducers';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionId: '',
      quantity: 1,
    };
  }
  componentDidMount() {
    const { fetchItemDetail, fetchProducts, productId } = this.props;
    fetchProducts('all', null, null, productId);
  }
  handleOptionChange = e => {
    const selectedOptionId = parseInt(e.target.value);
    this.setState({
      selectedOptionId,
      quantity: 1,
    });
  };
  handleQtyChange = e => {
    const quantity = parseInt(e.target.value);
    this.setState({
      quantity,
    });
  };
  handleCreateCartItem = async (optionId, quantity) => {
    const { createCartItem } = this.props;
    createCartItem(parseInt(optionId), parseInt(quantity));
  };
  countFinalPrice = (options, selectedOptionId, quantity) => {
    const selectedOption = options.find(o => o.id === selectedOptionId);
    return selectedOption && selectedOption.price * quantity;
  };
  render() {
    const { options } = this.props;
    const { selectedOptionId, quantity } = this.state;
    const finalPrice =
      options && this.countFinalPrice(options, selectedOptionId, quantity);
    return (
      <div>
        <ProductDetailView
          onCreateCartItem={this.handleCreateCartItem}
          onQtyChange={this.handleQtyChange}
          onOptionChange={this.handleOptionChange}
          finalPrice={finalPrice}
          selectedOptionId={selectedOptionId}
          quantity={quantity}
          {...this.props}
        />
      </div>
    );
  }
}

const getProductDetailInfo = (state, productId) => {
  if (state.products.byProductId[productId]) {
    return state.products.byProductId[productId];
  } else {
    return state.productDetail.productDetailInfo;
  }
};

const mapStateToProps = (state, { match }) => {
  const productId = match.params.productId;
  const productDetailInfo = getProductDetailInfo(state, productId);
  return {
    productId,
    ...productDetailInfo,
  };
};

ProductDetail = withRouter(
  connect(
    mapStateToProps,
    actions
  )(ProductDetail)
);

export default ProductDetail;
