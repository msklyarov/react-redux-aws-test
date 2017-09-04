const INIT_STATE = {
  authenticated: window.checkAuthenticatedStatus(),
  data: window.getAwsData(),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        authentication: true,
      };
    case 'LOGIN_OK':
      return {
        authentication: false,
        authenticated: true,
        data: action.data,
      };
    case 'LOGIN_ERR':
      return {
        authentication: false,
        authenticated: false,
        err: action.err,
      };
    case 'LOGOUT_OK':
      return {
        authenticated: false,
      };
    case 'LOGOUT_ERR':
      return {
        authenticated: false,
        err: action.err,
      };
    default:
      return state;
  }
};

export default reducer;