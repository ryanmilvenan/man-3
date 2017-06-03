import { fork } from 'redux-saga/effects';

import authSaga from '../auth/authSaga';
import apiSaga from '../api/apiSaga';

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(apiSaga)
  ];
}