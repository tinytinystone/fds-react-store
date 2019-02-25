// const productDetailInCartItem = (state = {}, action) => {
//   switch (action.type) {
//     case 'RECEIVE_CART_ITEMS':
//     default:
//       return state;
//   }
// };

const cartList = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CART_ITEMS':
      return action.cartItems.map(cartItem => {
        const { id, quantity, option } = cartItem;
        const { mainImgUrl, title } = action.products.find(
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
    default:
      return state;
  }
};

export default cartList;

export const getCartList = state => state;
