import api from '../api';
import {
  updateCartItem,
  requestCartItems,
  receiveCartItems,
} from './actionCreator';

export const createCartItem = (optionId, quantity) => async dispatch => {
  await api.post('cartItems', {
    optionId,
    quantity,
    ordered: false,
  });
  alert('장바구니에 담겼습니다.');
  return dispatch(updateCartItem());
};

export const refreshCartItems = () => async dispatch => {
  dispatch(requestCartItems);
  const { data: cartItems } = await api.get('cartItems/', {
    params: {
      ordered: false,
      _expand: 'option',
    },
  });
  const p = new URLSearchParams();
  cartItems.forEach(element => {
    p.append('id', element.option.productId);
  });
  const { data: products } = await api.get('products', {
    params: p,
  });

  return dispatch(receiveCartItems(cartItems, products));
};
