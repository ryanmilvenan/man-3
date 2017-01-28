import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from '../common/containers/Root';


const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootElement
)
