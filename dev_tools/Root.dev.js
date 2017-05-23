import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './configureStore.dev.js'
import DevTools from './DevTools.js'
import NewsStand from '../common/containers/NewsStand.js'
import AddNewsContainer from '../common/containers/AddNewsContainer.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
			<DevTools />
      <MuiThemeProvider>
        <NewsStand />
      </MuiThemeProvider>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
