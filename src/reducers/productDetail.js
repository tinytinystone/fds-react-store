import { combineReducers } from 'redux';

const productDetailInfo = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ITEM_DETAIL':
      return {
        ...state,
        ...action.product,
      };
    default:
      return state;
  }
};

const selectedProduct = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_OPTION_CHANGE':
      return {
        ...state,
        optionId: action.optionId,
        quantity: 1,
      };
    case 'UPDATE_QUANTITY_CHANGE':
      return {
        ...state,
        quantity: action.quantity,
      };
    case 'UPDATE_CART_INFO':
      return {
        ...state,
      };
    default:
      return state;
  }
};

const productDetail = combineReducers({
  productDetailInfo,
  selectedProduct,
});

export default productDetail;
