import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import products, * as fromProducts from './products';
import productDetail from './productDetail';
import cartList, * as fromCartList from './cartList';

const rootReducer = combineReducers({
  users,
  products,
  productDetail,
  cartList,
});

export default rootReducer;

export const getUsers = state => fromUsers.getUsers(state);

export const getProducts = (state, category) =>
  fromProducts.getProducts(state, category);

export const getTotalCount = (state, category) =>
  fromProducts.getTotalCount(state, category);

// export const getCartList = state => fromCartList.getCartList(state);
export const getCartList = state => state.cartList;
