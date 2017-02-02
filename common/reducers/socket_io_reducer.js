export const REFRESH_SOURCE = 'SERVER:REFRESH_SOURCE';
export const LATEST_DATA = 'CLIENT:SOURCE';

export const SOCKET_EVENTS_ACTION_CREATORS = {
  refreshSource: (id, url) => ({
    type: REFRESH_SOURCE,
    id,
    url
  }) 
}
