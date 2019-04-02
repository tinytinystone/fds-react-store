export const users = (state = {}, action) => {
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
    case 'LOGIN_FAILURE':
    case 'LOGOUT FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export default users;

export const getUsers = state => {
  return state.users;
};
