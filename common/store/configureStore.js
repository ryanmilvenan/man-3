import { createStore } from 'redux';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
     const nextRootReducer = require('../reducers').default;
     store.replaceReducer(nextRootReducer)
    }
  }
}

export default configureStore;
