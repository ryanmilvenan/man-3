import { createStore, compose, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import createDebounce from 'redux-debounce';
import io from 'socket.io-client';
import rootReducer, { initialState } from 'reducers/index.js';

let socket = io.connect('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER:");

const debounceConfig = {
  db: 500
}

let debouncer = createDebounce(debounceConfig);

const enhancer = compose(
  applyMiddleware(
    debouncer,
    socketIoMiddleware 
  )
)

export default function configureStore(preloadedState) {
  const combinedState = Object.assign(initialState, preloadedState);
  const store = createStore(
    rootReducer,
    combinedState,
    enhancer
  )

  return store;
}

