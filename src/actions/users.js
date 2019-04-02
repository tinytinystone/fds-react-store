import api from '../api';
import { updateUserInfo, emptyUserInfo } from './actionCreator';

export const refreshUsers = () => async dispatch => {
  const response = await api.get('/me');
  const { username, id } = response.data;
  return dispatch(updateUserInfo(username, id));
};

export const login = (username, password) => async dispatch => {
  try {
    const response = await api.post('/users/login', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    await dispatch(refreshUsers());
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      message: `${error} is occurred.`,
    });
  }
};

export const logout = () => dispatch => {
  try {
    localStorage.removeItem('token');
    return dispatch(emptyUserInfo());
  } catch (error) {
    dispatch({
      type: 'LOGOUT_FAILURE',
      message: `${error} is occurred.`,
    });
  }
};

export const register = (username, password) => async dispatch => {
  try {
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
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAILURE',
      message: `${error} is occurred.`,
    });
  }
};
