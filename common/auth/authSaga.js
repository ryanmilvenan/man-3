import Auth0Lock from 'auth0-lock';
import { call, put, take, fork } from 'redux-saga/effects';
import { AUTH_ACTION_CREATORS } from '../reducers/auth_reducer';
import { ASYNC_ACTION_CREATORS } from '../reducers/async_reducer';
import { setStoredAuthState, removeStoredAuthState, getStoredAuthState } from './utils';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGIN_VERIFY,
} from '../reducers/auth_reducer';

const {
  loginFailure,
  loginSuccess,
  checkLogin,
} = AUTH_ACTION_CREATORS;

const {
  fetchState
} = ASYNC_ACTION_CREATORS;

export function* loginRequestSaga() {
  const lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN, {
      auth: { 
        redirect: false, 
        params: {scope: 'openid profile email'},
      },
      languageDictionary: { title: 'Carnival In Paradise' },
      allowedConnections: [
        'google-oauth2'
      ]
    },
  );

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        const { accessToken, idToken } = authResult;
        lock.getUserInfo(accessToken, (error, userProfile) => {
          if (!error) {
            const profile = Object.assign({}, userProfile);

            lock.hide();
            resolve({ profile, idToken });
          }
        });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });

      lock.show();
    });

  try {
    const { profile, idToken } = yield call(showLock);

    yield put(loginSuccess(profile, idToken));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* watchLoginRequest() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield call(loginRequestSaga);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { profile, idToken } = yield take(LOGIN_SUCCESS);

    setStoredAuthState(profile, idToken);
    yield put(fetchState({ idToken, profile }));
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);

    removeStoredAuthState();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthState();
    yield put(fetchState({}));
  }
}

export function* watchVerifyLogin() {
  while (true) {
    yield take(LOGIN_VERIFY);
    const auth = yield put(checkLogin(getStoredAuthState()));
    yield put(fetchState(auth.authState));
  }
}

export default function* authSaga() {
  yield [
    fork(watchLoginRequest),
    fork(watchLoginSuccess),
    fork(watchLoginFailure),
    fork(watchLogout),
    fork(watchVerifyLogin)
  ]
}