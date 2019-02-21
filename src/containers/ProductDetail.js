import React, { Component } from 'react';
import ProductDetailView from '../components/ProductDetailView';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions';

class ProductDetail extends Component {
  componentDidMount() {
    const { fetchItemDetail, productId } = this.props;
    fetchItemDetail(productId);
  }
  handleUpdateQuantityChange = quantity => {
    this.props.updateQuantityChange(quantity);
  };
  handleUpdateoptionChange = option => {
    this.props.updateOptionChange(option);
  };
  handleCreateCartItem = async (optionId, quantity) => {
    const { createCartItem } = this.props;
    createCartItem(parseInt(optionId), parseInt(quantity));
  };
  render() {
    return (
      <div>
        <ProductDetailView
          onCreateCartItem={this.handleCreateCartItem}
          {...this.props}
          onUpdateQuantityChange={this.handleUpdateQuantityChange}
          onUpdateOptionChange={this.handleUpdateOptionChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const productId = match.params.productId;
  const productDetailInfo = state.productDetail.productDetailInfo;
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
