import byCartId, * as fromByCartId from './byCartId';
import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CART_ITEMS':
      return action.cartItems.map(cart => cart.id);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_CART_ITEMS':
      return true;
    case 'RECEIVE_CART_ITEMS':
      return false;
    default:
      return state;
  }
};

const cartList = combineReducers({
  ids,
  isFetching,
});

const cartItems = combineReducers({
  byCartId,
  cartList,
});

export default cartItems;

export const getIsFetching = state => state.isFetching;

export const getCartItems = state => {
  const ids = state.cartItems.cartList.ids;
  const result = ids.map(id =>
    fromByCartId.getCartItems(state.cartItems.byCartId, id)
  );
  return result;
};
