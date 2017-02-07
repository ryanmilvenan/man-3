import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.dev.js'
import Root from './Root.dev.js';
import { AppContainer } from 'react-hot-loader';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import 'font-awesome/css/font-awesome.css';
import 'sass/main.scss';

const preloadedState = window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : {};
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');
store.dispatch(SOCKET_EVENTS_ACTION_CREATORS.fetchState());

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootElement
)


if (module.hot) {
  module.hot.accept('../common/components/Root', () => {
    const NextRoot = require('../common/components/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      rootElement
    )
  })
}
