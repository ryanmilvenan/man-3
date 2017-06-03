import { getStoredAuthState } from '../auth/utils';

export const LOGIN_REQUEST = 'AUTH:LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH:LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH:LOGIN_FAILURE';
export const LOGIN_VERIFY = 'AUTH:LOGIN_VERIFY';
export const LOGIN_CHECK = 'AUTH:LOGIN_CHECK';
export const LOGOUT = 'AUTH:LOGOUT';

export const initialState = {
  isLoggingIn: false,
  idToken: null,
  profile: null,
  error: null,
};

export function auth(state = Object.assign({}, initialState, getStoredAuthState()), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      }
    case LOGIN_SUCCESS:
      const { idToken, profile } = action;
      return {
        ...state,
        isLoggingIn: false,
        idToken,
        profile,
      }
    case LOGIN_FAILURE:
      const { error } = action;
      return {
        ...state,
        isLoggingIn: false,
        idToken: null,
        profile: null,
        error
      }
    case LOGOUT:
      return initialState;
    case LOGIN_CHECK:
      const { authState } = action;
      return Object.assign({}, state, authState);
    default:
      return state;
  }
}

export const AUTH_ACTION_CREATORS = {
  loginRequest: () => ({
    type: LOGIN_REQUEST,
  }),
  loginSuccess: (profile, idToken) => ({
    type: LOGIN_SUCCESS,
    profile,
    idToken,
  }),
  loginFailure: (error) => ({
    type: LOGIN_FAILURE,
    error,
  }),
  logout: () => ({
    type: LOGOUT,
  }),
  checkLogin: (authState) => ({
    type: LOGIN_CHECK,
    authState
  }),
  verifyLogin: () => ({
    type: LOGIN_VERIFY
  })
}