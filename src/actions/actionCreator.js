export const updateUserInfo = (username, id) => ({
  type: 'UPDATE_USER_INFO',
  username,
  id,
});

export const emptyUserInfo = () => ({
  type: 'EMPTY_USER_INFO',
});

export const fetchProductsRequest = () => ({
  type: 'FETCH_PRODUCTS_REQUEST',
});

export const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

export const fetchProductsSuccess = (response, category, totalCount, page) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  response,
  category,
  totalCount,
  page,
});

export const receiveProducts = (products, category, totalCount, page) => ({
  type: 'RECEIVE_PRODUCTS',
  products,
  category,
  totalCount,
  page,
});

export const requestItemDetail = productId => ({
  type: 'REQUEST_ITEM_DETAIL',
  productId,
});

export const receiveItemDetail = product => ({
  type: 'RECEIVE_ITEM_DETAIL',
  product,
});

export const updateCartItem = () => ({
  type: 'UPDATE_CART_ITEM',
});

export const requestCartItems = () => ({
  type: 'REQUEST_CART_ITEMS',
});

export const receiveCartItems = cartItems => ({
  type: 'RECEIVE_CART_ITEMS',
  cartItems,
});

export const updateOrder = () => ({
  type: 'UPDATE_ORDER',
});
