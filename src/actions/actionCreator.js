export const updateUserInfo = (username, id) => ({
  type: 'UPDATE_USER_INFO',
  username,
  id,
});

export const emptyUserInfo = () => ({
  type: 'EMPTY_USER_INFO',
});

export const requestProducts = (page, category) => ({
  type: 'REQUEST_PRODUCTS',
  page,
  category,
});

export const receiveProducts = (page, category, products, totalCount) => ({
  type: 'RECEIVE_PRODUCTS',
  page,
  category,
  products,
  totalCount,
});

export const requestItemDetail = productId => ({
  type: 'REQUEST_ITEM_DETAIL',
  productId,
});

export const receiveItemDetail = product => ({
  type: 'RECEIVE_ITEM_DETAIL',
  product,
});

export const updateCartInfo = () => ({
  type: 'UPDATE_CART_INFO',
});
