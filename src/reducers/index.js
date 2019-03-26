import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import products, * as fromProducts from './products';
import cartItems, * as fromCartItems from './cartItems';

const rootReducer = combineReducers({
  users,
  products,
  cartItems,
});

export default rootReducer;

export const getUsers = state => fromUsers.getUsers(state);

export const getProducts = (state, category) =>
  fromProducts.getProducts(state, category);

export const getTotalCount = (state, category) =>
  fromProducts.getTotalCount(state, category);

export const getIsFetching = (state, category) =>
  fromProducts.getIsFetching(state, category);

export const getCartItems = state => fromCartItems.getCartItems(state);

export const getCartDetails = state => {
  const cartItems = getCartItems(state);
  const products = fromProducts.getProductsForCartItems(state);
  return cartItems.map(cartItem => {
    const { id, quantity, option } = cartItem;
    const { mainImgUrl, title } = products.find(
      product => cartItem.option.productId === product.id
    );
    return {
      ...state,
      cartId: id,
      title,
      price: option.price,
      mainImgUrl,
      quantity,
      optionTitle: option.title,
      productId: option.productId,
      checked: true,
    };
  });
};
