import { REFRESH_SOURCE } from './socket_io_reducer.js';

//NewsItem Actions
export const TOGGLE_DETAIL_EXPAND = 'NEWSITEM:TOGGLE_DETAIL_EXPAND';

export const NEWS_ITEM_ACTION_CREATORS = {
  toggleExpand: (containerId, itemId) => ({
    type: TOGGLE_DETAIL_EXPAND,
    containerId,
    itemId
  })
}

export const newsItem = (state = {}, action, itemId) => {
  switch(action.type) {
    case UPDATE_NEWS_CONTAINER_SOURCES:
      return {
        ...state,
        itemId,
        containerId: action.data.id,
        expanded: false
      }
    case TOGGLE_DETAIL_EXPAND:
      if(state.itemId !== action.itemId || state.containerId !== action.containerId) {
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
  addNewsContainer: (url, nextId) => ({
    type: ADD_NEWS_CONTAINER,
    id: nextId,
    url
  }),

  deleteNewsContainer: (id) => ({
    type: DELETE_NEWS_CONTAINER,
    id: id
  })
}

export const newsContainer = (state = {}, action, idx = -1) => {
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return {
        id: action.id,
        url: action.url,
        maxHeadlines: 10,
        timeout: (1000 * 60 * 10),
        items: [],
        loading: true
      }
    case REFRESH_SOURCE:
      if(action.id == state.id) {
        return {
          ...state,
          loading: true
        }	
      } else {
        return state;
      }	
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if(action.data.id == state.id && action.data.feed) {
        return {
          ...state,
          loading: false,
          items: action.data.feed.entries.slice(0, state.maxHeadlines).map((item, idx) => {
            return newsItem(item, action, idx) 
          })
        }
      } else {
        return state; 
      }
    case TOGGLE_DETAIL_EXPAND:
      return {
        ...state,
        items: state.items.map((item, idx) => {
          return newsItem(item, action, idx)
        })
      };
    case DELETE_NEWS_CONTAINER:
      return {
        ...state,
        id: idx,
        items: state.items.map((item, idx) => {
          return newsItem(item, action, idx)
        })
      }
    default:
      return state;
  }
}

export const FETCH_SAVED_SOURCES = 'NEWSSTAND:FETCH_SAVED_SOURCES';
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
      ).map((n, idx) => {
        newsContainer(n, action, idx); 
      });
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if (action.data.err) {
        console.error(`CONTAINER ERROR: could not get source for url ${action.data.url}`);
        return state.filter(n =>
          n.id != action.data.id
        );
      } else {
        return state.map(n =>
          newsContainer(n, action) 
        );
      }
    case TOGGLE_DETAIL_EXPAND:
      return state.map(n => 
        newsContainer(n, action) 
      );
		case REFRESH_SOURCE:
			return state.map(n =>
				newsContainer(n, action)
			);
    case FETCH_SAVED_SOURCES:
      return [
        ...action.data.state
      ]
    default:
      return state;
  }
}
