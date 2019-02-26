import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import products, * as fromProducts from './products';
import productDetail from './productDetail';
import cartItems, * as fromCartItems from './cartItems';

const rootReducer = combineReducers({
  users,
  products,
  productDetail,
  cartItems,
});

export default rootReducer;

export const getUsers = state => fromUsers.getUsers(state);

export const getProducts = (state, category) =>
  fromProducts.getProducts(state, category);

export const getTotalCount = (state, category) =>
  fromProducts.getTotalCount(state, category);

export const getCartItems = state => fromCartItems.getCartItems(state);

export const getIsFetching = state => {
  fromCartItems.getIsFetching(state);
};
