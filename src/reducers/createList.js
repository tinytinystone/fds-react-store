import { combineReducers } from 'redux';

const createList = category => {
  const ids = (state = [], action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return action.products.map(product => product.id);
      default:
        return state;
    }
  };
  const totalCount = (state = 0, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return action.totalCount;
      default:
        return state;
    }
  };
  return combineReducers({
    ids,
    totalCount,
  });
};

export default createList;

export const getProductIds = state => state.ids;
export const getTotalCount = state => state.totalCount;
