const byCartId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CART_ITEMS':
      const nextState = { ...state };
      action.cartItems.forEach(cartItem => {
        nextState[cartItem.id] = cartItem;
      });
      return nextState;
    default:
      return state;
  }
};

export default byCartId;

export const getCartItems = (state, id) => state[id];
