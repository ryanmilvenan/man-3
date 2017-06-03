export const REFRESH_SOURCE = 'ASYNC:REFRESH_SOURCE';
export const PERSIST_STATE = 'ASYNC:PERSIST_STATE';
export const FETCH_STATE = 'ASYNC:FETCH_STATE';
export const DELETE_CONTAINER = 'ASYNC:DELETE_CONTAINER';
export const REARRANGE_CONTAINER = 'ASYNC:REARRANGE_CONTAINER';
export const ASYNC_ACTION_CREATORS = {
  refreshSource: (state) => ({
    type: REFRESH_SOURCE,
    state
  }),
  persistState: (state, idToken) => ({
    meta: {
      debounce: 'simple',
    },
    type: PERSIST_STATE,
    state,
    idToken
  }),
  fetchState: (auth) => ({
    type: FETCH_STATE,
    auth
  }),
  deleteContainer: (id, idToken) => ({
    type: DELETE_CONTAINER,
    id,
    idToken
  }),
  rearrangeContainer: (id, direction, idToken) => ({
    type: REARRANGE_CONTAINER,
    id,
    direction,
    idToken
  })
}