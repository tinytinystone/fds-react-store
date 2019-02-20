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
