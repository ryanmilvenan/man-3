import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { NEWS_CONTAINER_ACTION_CREATORS, NEWS_STAND_ACTION_CREATORS } from 'reducers/news_container_reducer';
import { ASYNC_ACTION_CREATORS } from 'reducers/news_container_reducer';
import {
  PERSIST_STATE,
  FETCH_STATE,
  REFRESH_SOURCE,
  DELETE_CONTAINER,
  REARRANGE_CONTAINER
} from 'reducers/async_reducer';

import Api from './api';

const {
  fetchSource,
  updateNewsContainerSources,
  updateNewsContainerIndices,
  rearrangeNewsContainerIndices,
} = NEWS_CONTAINER_ACTION_CREATORS;

const {
  fetchedSources
} = NEWS_STAND_ACTION_CREATORS;


function* refreshSource(action) {
  try {
    const { state } = action;
    yield put(fetchSource(state.id));
    const source = yield call(Api.refreshSource, state);
    const { id, url, feed, err } = source;
    yield put(updateNewsContainerSources(id, url, feed, err));
  } catch (e) {
    yield put(fetchSource(state.id));
  }
}

function* deleteSource(action) {
  try {
    const { id } = action;
    yield put(updateNewsContainerIndices(id));
    yield call(Api.deleteSource, id);
  } catch (e) {
    console.error(`Error deleting source:${e}`);
  }
}


function* rearrangeSources(action) {
  try {
    const { id, direction } = action;
    yield put(rearrangeNewsContainerIndices(id, direction));
    yield call(Api.rearrangeSources, id, direction);
  } catch (e) {
    console.error(`Error Rearranging Sources: ${e}`);
  }
}

function* persistState(action) {
  const { state } = action;
  yield call(Api.persistSource, state);
}

function* fetchState(action) {
  const state = yield call(Api.fetchState);
  yield put(fetchedSources(state));
}


export default function* apiSaga() {
  yield takeEvery(REFRESH_SOURCE, refreshSource);
  yield takeEvery(DELETE_CONTAINER, deleteSource);
  yield takeEvery(REARRANGE_CONTAINER, rearrangeSources);
  yield takeLatest(PERSIST_STATE, persistState);
  yield takeLatest(FETCH_STATE, fetchState);
};