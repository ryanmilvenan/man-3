export const REFRESH_SOURCE = 'SERVER:REFRESH_SOURCE';
export const FETCH_STATE = 'SERVER:FETCH_STATE';
export const PERSIST_STATE = 'SERVER:PERSIST_STATE';
export const DELETE_CONTAINER = 'SERVER:DELETE_CONTAINER';
export const REARRANGE_CONTAINER = 'SERVER:REARRANGE_CONTAINER';
export const LATEST_DATA = 'CLIENT:SOURCE';

export const SOCKET_EVENTS_ACTION_CREATORS = {
  refreshSource: (state) => ({
    type: REFRESH_SOURCE,
    state
  }),
  fetchState: () => ({
    type: FETCH_STATE 
  }),
  persistState: (state) => ({
    meta: {
      debounce: 'db'
    },
    type: PERSIST_STATE,
    state
  }),
  deleteContainer: (id) => ({
    type: DELETE_CONTAINER,
    id
  }),
  rearrangeContainer: (id, direction) => ({
    type: REARRANGE_CONTAINER,
    id,
    direction
  })
}
