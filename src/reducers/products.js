import { combineReducers } from 'redux';
import byProductId, * as fromByProductId from './byProductId';
import createList, * as fromCreateList from './createList';
import * as fromCartItems from './cartItems';

const listByCategory = combineReducers({
  all: createList('all'),
  flower: createList('flower'),
  plant: createList('plant'),
  cactus: createList('cactus'),
  hanging: createList('hanging'),
  orchid: createList('orchid'),
  cartList: createList('cartList'),
  currentProductDetail: createList('currentProductDetail'),
});

const products = combineReducers({
  byProductId,
  listByCategory,
});

export default products;

export const getProducts = (state, category) => {
  const ids = fromCreateList.getProductIds(
    state.products.listByCategory[category]
  );
  return ids.map(id =>
    fromByProductId.getProduct(state.products.byProductId, id)
  );
};

export const getTotalCount = (state, category) => {
  return fromCreateList.getTotalCount(state.products.listByCategory[category]);
};

export const getIsFetching = (state, category) => {
  return fromCreateList.getIsFetching(state.products.listByCategory[category]);
};

export const getProductsForCartItems = state => {
  const cartItems = fromCartItems.getCartItems(state);
  return cartItems.map(
    cartItem => state.products.byProductId[cartItem.option.productId]
  );
};
