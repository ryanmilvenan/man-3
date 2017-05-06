export const REFRESH_SOURCE = 'SERVER:REFRESH_SOURCE';
export const FETCH_STATE = 'SERVER:FETCH_STATE';
export const DELETE_CONTAINER = 'SERVER:DELETE_CONTAINER';
export const LATEST_DATA = 'CLIENT:SOURCE';

export const SOCKET_EVENTS_ACTION_CREATORS = {
  refreshSource: (state, id, url) => ({
    type: REFRESH_SOURCE,
		state,
    id,
    url
  }),
  fetchState: () => ({
    type: FETCH_STATE 
  }),
  deleteContainer: (id) => ({
    type: DELETE_CONTAINER,
    id
  })
}
