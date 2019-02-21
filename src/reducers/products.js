import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromCreateList from './createList';

const listByCategory = combineReducers({
  all: createList('all'),
  flower: createList('flower'),
  plant: createList('plant'),
  cactus: createList('cactus'),
  hanging: createList('hanging'),
  orchid: createList('orchid'),
});

const products = combineReducers({
  byId,
  listByCategory,
});

export default products;

export const getProducts = (state, category) => {
  const ids = fromCreateList.getIds(state.products.listByCategory[category]);
  return ids.map(id => fromById.getProduct(state.products.byId, id));
};

export const getTotalCount = (state, category) => {
  return fromCreateList.getTotalCount(state.products.listByCategory[category]);
};
