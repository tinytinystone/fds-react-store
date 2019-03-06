import { combineReducers } from 'redux';
import byProductId, * as fromByProductId from './byProductId';
import createList, * as fromCreateList from './createList';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS':
      return true;
    case 'RECEIVE_PRODUCTS':
      return false;
    default:
      return state;
  }
};

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
  isFetching,
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
