import { combineReducers } from 'redux';

const users = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        id: action.id,
        username: action.username,
      };
    case 'EMPTY_USER_INFO':
      return {
        ...state,
        id: null,
        username: null,
      };
    default:
      return state;
  }
};

const userLogoutStatus = (state = false, action) => {
  switch (action.type) {
    case 'LOGOUT_SUCESS':
      return true;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users,
  userLogoutStatus,
});

export default rootReducer;

export const getUsers = state => {
  return state.users;
};

export const getUserLogoutStatus = state => {
  return state.userLogoutStatus;
};
