import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import products, * as fromProducts from './products';
import productDetail, * as fromProductDetail from './productDetail';

const rootReducer = combineReducers({
  users,
  products,
  productDetail,
});

export default rootReducer;

export const getUsers = state => fromUsers.getUsers(state);

export const getProducts = (state, category) =>
  fromProducts.getProducts(state, category);

export const getTotalCount = (state, category) =>
  fromProducts.getTotalCount(state, category);
