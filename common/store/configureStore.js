import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { initialState } from 'reducers/index.js';
import apiSaga from '_async/sagas';

let sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(
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

  sagaMiddleware.run(apiSaga);

  return store;
}