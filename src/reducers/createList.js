import { combineReducers } from 'redux';

const createList = category => {
  const ids = (state = [], action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return action.response.data.map(product => product.id);
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
        return parseInt(action.response.headers['x-total-count']);
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

export const getIds = state => state.ids;
export const getTotalCount = state => state.totalCount;
