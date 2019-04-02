import byCartId, * as fromByCartId from './byCartId';
import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CART_ITEMS_SUCCESS':
      return action.response.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_CART_ITEMS_REQUEST':
      return true;
    case 'FETCH_CART_ITEMS_SUCCESS':
    case 'FETCH_CART_TIEMS_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_CART_ITEMS_FAILURE':
    case 'CREATE_CART_ITEMS_FAILURE':
    case 'DELETE_CART_ITEMS_FAILURE':
      return action.message;
    case 'FETCH_CART_ITEMS_REQUEST':
    case 'FETCH_CART_ITEMS_SUCCESS':
      return null;
    default:
      return state;
  }
};

const listByCartItems = combineReducers({
  ids,
  isFetching,
  errorMessage,
});

const cartItems = combineReducers({
  byCartId,
  listByCartItems,
});

export default cartItems;

export const getCartItems = state => {
  const ids = state.cartItems.listByCartItems.ids;
  return ids.map(id => fromByCartId.getCartItems(state.cartItems.byCartId, id));
};
export const getIsFetching = state => state.cartItems.isFetching;
export const getErrorMessage = state => state.cartItems.errorMessage;
