import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './configureStore.dev.js'
import DevTools from './DevTools.js'
import NewsStand from '../common/containers/NewsStand.js'
import AddNewsContainer from '../common/containers/AddNewsContainer.js'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
			<DevTools />
			<AddNewsContainer />
      <NewsStand />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
