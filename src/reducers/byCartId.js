const byCartId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.cartItems,
    };
  }
  return state;
};

export default byCartId;

export const getCartItems = (state, id) => state[id];
