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
        logoutSuccess: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users,
});

export default rootReducer;

export const getUsers = state => {
  return state.users;
};
