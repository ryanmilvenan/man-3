import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../common/reducers/index.js';
import DevTools from './DevTools.js';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';


export default function configureStore(preloadedState) {
  const socket = io('http://localhost:3000');
  const socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER:");

  const enhancer = compose(
    applyMiddleware(
      socketIoMiddleware
    ),
    DevTools.instrument()
  )
  const store = createStore(
    rootReducer,
    preloadedState,
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

