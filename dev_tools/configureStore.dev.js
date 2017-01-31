import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../common/reducers/index.js';
import DevTools from './DevTools.js';

const enhancer = compose(
	DevTools.instrument()
)

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
		enhancer
  )

  if (module.hot) {
    module.hot.accept('../common/reducers', () => {
     const nextRootReducer = require('../common/reducers/index').default;
     store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

