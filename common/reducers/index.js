import { combineReducers } from 'redux';
import newsContainers from './news_container_reducer';
import socketIO from './socket_io_reducer';

const rootReducer = combineReducers({
	socketIO,
  newsContainers
});

export default rootReducer;
