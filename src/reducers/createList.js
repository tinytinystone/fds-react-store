import { combineReducers } from 'redux';

const createList = category => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_SUCCESS':
        return category === action.category ? action.response.result : state;
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return true;
      case 'FETCH_PRODUCTS_SUCCESS':
      case 'FETCH_PRODUCTS_FAILURE':
        return false;
      default:
        return state;
    }
  };
  const totalCount = (state = 0, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_PRODUCTS_SUCCESS':
        return action.totalCount;
      default:
        return state;
    }
  };
  const errorMessage = (state = null, action) => {
    if (category !== action.category) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_PRODUCTS_FAILURE':
        return action.message;
      case 'FETCH_PRODUCTS_REQUEST':
      case 'FETCH_PRODUCTS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    totalCount,
    errorMessage,
  });
};

export default createList;

export const getProductIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getTotalCount = state => state.totalCount;
