import { combineReducers } from 'redux';

const users = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        id: action.id,
        username: action.username,
      };
    case 'EMPTY_USER_INFO':
      return {
        ...state,
        id: null,
        username: null,
        logoutSuccess: true,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      const nextState = { ...state };
      action.response.data.forEach(product => {
        nextState[product.id] = product;
      });
      return nextState;
    default:
      return state;
  }
};

const createList = category => {
  const ids = (state = [], action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return action.response.data.map(product => product.id);
      default:
        return state;
    }
  };
  const totalCount = (state = 0, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return parseInt(action.response.headers['x-total-count']);
      default:
        return state;
    }
  };
  return combineReducers({
    ids,
    totalCount,
  });
};
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

const rootReducer = combineReducers({
  users,
  products,
});

export default rootReducer;

export const getUsers = state => {
  return state.users;
};

const getProduct = (state, id) => state[id];
const getIds = state => state.ids;
const getTotalCount = state => state.totalCount;

export const getProducts = (state, category) => {
  const ids = getIds(state.products.listByCategory[category]);
  return ids.map(id => getProduct(state.products.byId, id));
};

export const getTotalCounts = (state, category) => {
  getTotalCount(state.products.listByCategory[category]);
};
