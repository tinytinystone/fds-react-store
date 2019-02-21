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

export default byId;

export const getProduct = (state, id) => state[id];
