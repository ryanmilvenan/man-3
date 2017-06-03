import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createDebounce from 'redux-debounce'

import rootReducer, { initialState } from 'reducers/index.js';
import rootSaga from 'saga/root';

const config = {
  simple: 500
}

let debouncer = createDebounce(config);
let sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(
    debouncer,
    sagaMiddleware
  )
)

export default function configureStore(preloadedState) {
  const combinedState = Object.assign(initialState, preloadedState);
  const store = createStore(
    rootReducer,
    combinedState,
    enhancer
  )

  sagaMiddleware.run(rootSaga);

  return store;
}