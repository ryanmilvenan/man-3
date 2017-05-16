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

export const newsItem = (state = {}, action, itemId, containerId) => {
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
    case UPDATE_NEWS_CONTAINER_INDICES:
      return {
        ...state,
        containerId,
        expanded: false
      }
    case FETCH_SOURCES:
      return {
        ...state,
        containerId,
        itemId,
        expanded: false
      }
    default:
      return state;
  }
}

//NewsContainer Actions
export const ADD_NEWS_CONTAINER = 'NEWSCONTAINER:ADD_NEWS_CONTAINER';
export const UPDATE_NEWS_CONTAINER_SOURCES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_SOURCES';
export const UPDATE_NEWS_CONTAINER_INDICES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_INDICES';

export const NEWS_CONTAINER_ACTION_CREATORS = {
  addNewsContainer: (url, nextId) => ({
    type: ADD_NEWS_CONTAINER,
    id: nextId,
    url
  }),

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
      if(action.data.id == idx && action.data.feed) {
        return {
          ...state,
          loading: false,
          id: idx,
          items: action.data.feed.entries.slice(0, state.maxHeadlines).map((item, idx) => {
            return newsItem(item, action, idx);
          })
        }
      } else {
        return state; 
      }
    case TOGGLE_DETAIL_EXPAND:
      return {
        ...state,
        items: state.items.map((item, idx) => {
          return newsItem(item, action, idx);
        })
      };
    case UPDATE_NEWS_CONTAINER_INDICES:
      return {
        ...state,
        id: idx,
        items: state.items.map((item, itemId) => {
          return newsItem(item, action, itemId, idx);
        })
      }
    case FETCH_SOURCES:
      return {
        ...state,
        id: idx,
        loading: false,
        items: state.items.map((item, itemId) => {
          return newsItem(item, action, itemId, idx);
        })
      }
    default:
      return state;
  }
}

export const FETCH_SOURCES = 'NEWSSTAND:FETCH_SOURCES';
export const newsContainers = (state = [], action) => {
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return [
        ...state,
        newsContainer(undefined, action)
      ];
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if (action.data.err) {
        console.error(`CONTAINER ERROR: could not get source for url ${action.data.url}`);
        return state.filter(n =>
          n.id != action.data.id
        );
      } else {
        return state.map((n, idx) =>
          newsContainer(n, action, idx) 
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
    case FETCH_SOURCES:
      return [
        ...action.data.state
      ].map((n, idx) => {
        return newsContainer(n, action, idx);
      });
    case UPDATE_NEWS_CONTAINER_INDICES:
      return state.filter(n =>
        n.id != action.data.id
      ).map((n, idx) => {
        return newsContainer(n, action, idx);
      });
    default:
      return state;
  }
}
