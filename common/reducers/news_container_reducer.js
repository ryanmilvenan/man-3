export const ADD_NEWS_CONTAINER = 'NEWSCONTAINER:ADD_NEWS_CONTAINER';
export const DELETE_NEWS_CONTAINER = 'NEWSCONTAINER:DELETE_NEWS_CONTAINER';
export const UPDATE_NEWS_CONTAINER_SOURCES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_SOURCES';

let nextNewsContainerId = 0;
export const NEWS_CONTAINER_ACTION_CREATORS = {
  addNewsContainer: (url) => ({
    type: ADD_NEWS_CONTAINER,
    id: nextNewsContainerId++,
    url
  }),

  deleteNewsContainer: (id) => ({
    type: DELETE_NEWS_CONTAINER,
    id: id
  })
}

const newsContainer = (state = {}, action) => {
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return {
        id: action.id,
        url: action.url,
        maxHeadlines: 10,
        timeout: (1000 * 60 * 10)
      }
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if(action.data.id == state.id) {
        return {
          ...state,
          feed: action.data.feed
        }
      } else {
        return state; 
      }
    default:
      return state;
  }
}

const newsContainers = (state = [], action) => {
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return [
        ...state,
        newsContainer(undefined, action)
      ];
    case DELETE_NEWS_CONTAINER:
      return state.filter(n =>
        n.id != action.id
      );
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if (action.data.err) {
        console.error(`CONTAINER ERROR: could not get source for url ${action.data.url}`);
      } else {
        return state.map(n =>
          newsContainer(n, action) 
        );     
      }
    default:
      return state;
  }
}

export default newsContainers;
