import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore.js'
import Root from '../common/components/Root';

const preloadedState = window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : {};
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');

render(
  <Root store={store} />,
  rootElement
)
