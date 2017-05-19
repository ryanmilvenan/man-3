import { combineReducers } from 'redux';
import { newsContainers } from './news_container_reducer';
import { appState, initialAppState } from './app_state_reducer';

const rootReducer = combineReducers({
  newsContainers,
  appState
});

export const initialState = Object.assign(
  {},
  initialAppState,
);

export default rootReducer;
