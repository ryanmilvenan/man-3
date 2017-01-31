import { combineReducers } from 'redux';
import newsContainers from './news_container_reducer';

const rootReducer = combineReducers({
  newsContainers
});

export default rootReducer;
