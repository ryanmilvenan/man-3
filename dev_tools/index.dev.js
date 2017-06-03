import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.dev.js'
import Root from './Root.dev.js';
import { AppContainer } from 'react-hot-loader';
import { ASYNC_ACTION_CREATORS} from 'reducers/async_reducer';
import { getStoredAuthState } from 'auth/utils';
import 'sass/main.scss';

const preloadedState = window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : {};
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');
const auth = getStoredAuthState();
store.dispatch(ASYNC_ACTION_CREATORS.fetchState(auth));

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
