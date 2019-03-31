const byOptionId = (state = {}, action) => {
  if (action.response.entities.cartItems) {
    return action.response.entities.cartItems.map(cartItem => cartItem.option)}
  }
  return state;
};
