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
  persistState: (state) => ({
    type: PERSIST_STATE,
    state
  }),
  fetchState: () => ({
    type: FETCH_STATE
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