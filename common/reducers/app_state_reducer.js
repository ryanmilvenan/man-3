export const TOGGLE_MENU_DRAWER = 'APPSTATE:TOGGLE_MENU_DRAWER';
export const TOGGLE_SOURCES_EXPANDED = 'APPSTATE:TOGGLE_SOURCES_EXPANDED';
export const SET_TITLE_TEXT = 'APPSTATE:SET_TITLE_TEXT';
export const SET_URL_TEXT = 'APPSTATE:SET_URL_TEXT';
export const RESET_TEXT_FIELDS = 'APPSTATE:RESET_TEXT_FIELDS';

export const APP_STATE_ACTION_CREATORS = {
  toggleDrawer: () => ({
    type: TOGGLE_MENU_DRAWER
  }),
  toggleSources: () => ({
    type: TOGGLE_SOURCES_EXPANDED
  }),
  setTitleText: (e) => ({
    type: SET_TITLE_TEXT,
    title: e.target.value
  }),
  setUrlText: (e) => ({
    type: SET_URL_TEXT,
    url: e.target.value
  }),
  resetTextFields: () => ({
    type: RESET_TEXT_FIELDS
  })
}

export const appState = (state = {}, action) => {
  switch(action.type) {
    case TOGGLE_MENU_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: !state.drawerOpen
      });
    case TOGGLE_SOURCES_EXPANDED:
      return Object.assign({}, state, {
        sourcesExpanded: !state.sourcesExpanded,
        title: '',
        url: ''
      });
    case SET_TITLE_TEXT:
      return Object.assign({}, state, {
        title: action.title
      });
    case SET_URL_TEXT:
      return Object.assign({}, state, {
        url: action.url
      });
    case RESET_TEXT_FIELDS:
      return Object.assign({}, state, {
        title: '',
        url: ''
      });
    default:
      return state;
  }
}

export const initialAppState = {
  appState: {
    drawerOpen: false,
    sourcesExpanded: false
  }
};
