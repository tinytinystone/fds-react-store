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

const productDetail = combineReducers({
  productDetailInfo,
});

export default productDetail;
