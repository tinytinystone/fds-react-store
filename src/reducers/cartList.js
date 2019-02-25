import byCartId, * as fromByCartId from './byCartId';
import { combineReducers } from 'redux';
// import createList, * as fromCreateList from './createList';

// const ids = (state = [], action) => {
//   switch (action.type) {
//     case 'RECEIVE_CART_ITEMS':
//       return action.carts.map(cart => cart.productId);
//     default:
//       return state;
//   }
// };

// const cartList = combineReducers({
//   byCartId,
// });

export default byCartId;

// export const getCartList = state => {
//   return fromByCartId.getCartList(state.cartList);
// };
