import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js'
import NewsStand from '../containers/NewsStand.js'
import AddNewsContainer from '../containers/AddNewsContainer.js'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
			<AddNewsContainer />
      <NewsStand />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
