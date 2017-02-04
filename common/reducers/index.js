import { combineReducers } from 'redux';
import { newsItem, newsContainer, newsContainers } from './news_container_reducer';

const rootReducer = combineReducers({
  newsContainers
});

export default rootReducer;
