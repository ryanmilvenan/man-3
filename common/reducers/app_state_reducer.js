export const TOGGLE_MENU_DRAWER = 'APPSTATE:TOGGLE_MENU_DRAWER';
export const TOGGLE_SOURCES_EXPANDED = 'APPSTATE:TOGGLE_SOURCES_EXPANDED';

export const APP_STATE_ACTION_CREATORS = {
  toggleDrawer: () => ({
    type: TOGGLE_MENU_DRAWER
  }),
  toggleSources: () => ({
    type: TOGGLE_SOURCES_EXPANDED
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
        sourcesExpanded: !state.sourcesExpanded
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
