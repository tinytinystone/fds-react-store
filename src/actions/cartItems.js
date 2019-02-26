import api from '../api';
import {
  updateCartItem,
  requestCartItems,
  receiveCartItems,
  updateOrder,
  requestProducts,
  receiveProducts,
} from './actionCreator';

export const createCartItem = (optionId, quantity) => async dispatch => {
  await api.post('cartItems', {
    optionId,
    quantity,
    ordered: false,
  });
  alert('장바구니에 담겼습니다.');
  // return dispatch(updateCartItem());
};

export const refreshCartItems = () => async dispatch => {
  dispatch(requestCartItems());
  const { data: cartItems } = await api.get('cartItems/', {
    params: {
      ordered: false,
      _expand: 'option',
    },
  });
  dispatch(requestProducts());
  const params = new URLSearchParams();
  cartItems.forEach(item => {
    params.append('id', item.option.productId);
  });
  const { data: products } = await api.get('products', {
    params,
  });
  dispatch(receiveProducts(products, 'cartList', products.length));
  dispatch(receiveCartItems(cartItems));
};

export const deleteCartItem = cartItemId => async dispatch => {
  await api.delete('cartItems/' + cartItemId);
  alert('해당 항목이 삭제 되었습니다.');
  await dispatch(refreshCartItems());
};

const requestCartItemOrdered = (
  cartItemId,
  quantity,
  orderId
) => async dispatch => {
  const response = await api.patch('cartItems/' + cartItemId, {
    ordered: true,
    quantity,
    orderId,
  });
  console.log(response);
  dispatch(updateOrder());
};
export const orderCartItems = (selectedItems, cartItems) => async dispatch => {
  const {
    data: { id: orderId },
  } = await api.post('/orders', {
    orderTime: Date.now(),
  });
  selectedItems.forEach(selectedItem => {
    const { id, quantity } = selectedItem;
    cartItems.forEach(cartItem => {
      if (cartItem.id === parseInt(id)) {
        dispatch(
          requestCartItemOrdered(cartItem.id, parseInt(quantity), orderId)
        );
      }
    });
  });
  alert('주문이 완료 되었습니다.');
  return dispatch(updateCartItem());
};
