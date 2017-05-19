import { createStore, compose, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import rootReducer, { initialState } from 'reducers/index.js';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER:");

const enhancer = compose(
  applyMiddleware(
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

