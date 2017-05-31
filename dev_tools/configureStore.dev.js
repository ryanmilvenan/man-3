import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer, { initialState } from '../common/reducers/index.js';
import apiSaga from '_async/sagas';
import DevTools from './DevTools.js';
import createSagaMiddleware from 'redux-saga';


export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware
    ),
    DevTools.instrument()
  )

  const combinedState = Object.assign(initialState, preloadedState);

  const store = createStore(
    rootReducer,
    combinedState,
    enhancer,
  )

  sagaMiddleware.run(apiSaga);

  if (module.hot) {
    module.hot.accept('../common/reducers', () => {
      const nextRootReducer = require('../common/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}