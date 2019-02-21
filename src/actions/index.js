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

const receiveProducts = (page, category, response) => ({
  type: 'RECEIVE_PRODUCTS',
  page,
  category,
  response,
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

  return dispatch(receiveProducts(page, category, response));
};
