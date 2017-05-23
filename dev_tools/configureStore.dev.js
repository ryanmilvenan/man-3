import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer, { initialState } from '../common/reducers/index.js';
import DevTools from './DevTools.js';
import createSocketIoMiddleware from 'redux-socket.io';
import createDebounce from 'redux-debounce';
import io from 'socket.io-client';


export default function configureStore(preloadedState) {
  const socket = io('http://localhost:3000');
  const socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER:");
  
  const debounceConfig = {
    db: 500
  }

  let debouncer = createDebounce(debounceConfig);

  const enhancer = compose(
    applyMiddleware(
      debouncer,
      socketIoMiddleware
    ),
    DevTools.instrument()
  )

  const combinedState = Object.assign(initialState, preloadedState);

  const store = createStore(
    rootReducer,
    combinedState,
		enhancer,
  )

  if (module.hot) {
    module.hot.accept('../common/reducers', () => {
     const nextRootReducer = require('../common/reducers/index').default;
     store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

