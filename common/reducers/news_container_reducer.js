//NewsItem Actions
export const TOGGLE_DETAIL_EXPAND = 'NEWSITEM:TOGGLE_DETAIL_EXPAND';

export const NEWS_ITEM_ACTION_CREATORS = {
  toggleExpand: (id) => ({
    type: TOGGLE_DETAIL_EXPAND,
    id
  })
}

export const newsItem = (state = {}, action) => {
  switch(action.type) {
    case TOGGLE_DETAIL_EXPAND:
      if(state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        expanded: !state.expanded 
      })
    default:
      return state;
  }
}

//NewsContainer Actions
export const ADD_NEWS_CONTAINER = 'NEWSCONTAINER:ADD_NEWS_CONTAINER';
export const DELETE_NEWS_CONTAINER = 'NEWSCONTAINER:DELETE_NEWS_CONTAINER';
export const UPDATE_NEWS_CONTAINER_SOURCES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_SOURCES';

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

let nextNewsContainerId = 0;
export const newsContainer = (state = {}, action) => {
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return {
        id: action.id,
        url: action.url,
        maxHeadlines: 10,
        timeout: (1000 * 60 * 10),
        items: []
      }
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if(action.data.id == state.id) {
        return {
          ...state,
          items: action.data.feed.entries,
          feed: action.data.feed
        }
      } else {
        return state; 
      }
    default:
      return state;
  }
}

export const newsContainers = (state = [], action) => {
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
