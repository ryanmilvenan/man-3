import { combineReducers } from 'redux';
import newsContainers from './news_container_reducer';
import sources from './socket_io_reducer';

const rootReducer = combineReducers({
	sources,
  newsContainers
});

export default rootReducer;
