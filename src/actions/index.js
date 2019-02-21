import api from '../api';

// USER 관련

const updateUserInfo = (username, id) => ({
  type: 'UPDATE_USER_INFO',
  username,
  id,
});

const emptyUserInfo = () => ({
  type: 'EMPTY_USER_INFO',
});

export const refreshUsers = () => async dispatch => {
  const response = await api.get('/me');
  const { username, id } = response.data;
  return dispatch(updateUserInfo(username, id));
};

export const login = (username, password) => async dispatch => {
  const response = await api.post('/users/login', {
    username,
    password,
  });
  localStorage.setItem('token', response.data.token);
  await dispatch(refreshUsers());
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  return dispatch(emptyUserInfo());
};

export const register = (username, password) => async dispatch => {
  const res = await api.get('/users', {
    params: {
      username,
    },
  });
  if (res.data.length > 0) {
    alert('동일한 아이디가 존재합니다.');
    return;
  } else {
    const res2 = await api.post('/users/register', {
      username,
      password,
    });
    localStorage.setItem('token', res2.data.token);
  }
  await dispatch(refreshUsers());
};

// ProductList 관련

const requestProducts = (page, category) => ({
  type: 'REQUEST_PRODUCTS',
  page,
  category,
});

const receiveProducts = (page, category, products, totalCount) => ({
  type: 'RECEIVE_PRODUCTS',
  page,
  category,
  products,
  totalCount,
});

export const fetchProducts = (
  page,
  category = null,
  productsPerPage
) => async dispatch => {
  dispatch(requestProducts);

  const hasCategory = category !== 'all' ? `category=${category}&` : '';
  const hasPage = page ? `_page=${page}` : '';

  const response = await api.get(
    `/products/?${hasCategory}_embed=options&${hasPage}&_limit=${productsPerPage}`
  );

  const products = response.data;
  const totalCount = parseInt(response.headers['x-total-count']);

  return dispatch(receiveProducts(page, category, products, totalCount));
};

// item detail 관련

const requestItemDetail = productId => ({
  type: 'REQUEST_ITEM_DETAIL',
  productId,
});

const receiveItemDetail = product => ({
  type: 'RECEIVE_ITEM_DETAIL',
  product,
});

export const updateOptionChange = optionId => ({
  type: 'UPDATE_OPTION_CHANGE',
  optionId,
});

export const updateQuantityChange = quantity => ({
  type: 'UPDATE_QUANTITY_CHANGE',
  quantity,
});

export const updateCartInfo = () => ({
  type: 'UPDATE_CART_INFO',
});

export const fetchItemDetail = productId => async dispatch => {
  dispatch(requestItemDetail);

  const response = await api.get('products/' + productId, {
    params: {
      _embed: 'options',
    },
  });
  const product = response.data;

  return dispatch(receiveItemDetail(product));
};

export const createCartItem = (optionId, quantity) => async dispatch => {
  await api.post('cartItems', {
    optionId,
    quantity,
    ordered: false,
  });
  alert('장바구니에 담겼습니다.');
  return dispatch(updateCartInfo());
};
