import { REFRESH_SOURCE } from './socket_io_reducer.js';

export const newsItem = (state = {}, action, itemId, containerId) => {
  switch(action.type) {
    case UPDATE_NEWS_CONTAINER_SOURCES:
      return {
        ...state,
        itemId,
        containerId: action.data.id,
      }
    case CHANGE_MAX_HEADLINES:
      return {
        ...state,
        itemId,
        containerId: action.id,
      }
    case UPDATE_NEWS_CONTAINER_INDICES:
      return {
        ...state,
        containerId,
      }
    case REARRANGE_NEWS_CONTAINER_INDICES:
      return {
        ...state,
        containerId,
      }
    case FETCH_SOURCES:
      return {
        ...state,
        containerId,
        itemId,
      }
    default:
      return state;
  }
}

//NewsContainer Actions
export const ADD_NEWS_CONTAINER = 'NEWSCONTAINER:ADD_NEWS_CONTAINER';
export const TOGGLE_CONFIGURE_MODE = 'NEWSCONTAINER:TOGGLE_CONFIGURE_MODE';
export const DISABLE_CONFIGURE_MODE = 'NEWSCONTAINER:DISABLE_CONFIGURE_MODE';
export const CHANGE_MAX_HEADLINES = 'NEWSCONTAINER:CHANGE_MAX_HEADLINES';
export const CHANGE_TITLE = 'NEWSCONTAINER:CHANGE_TITLE';
export const UPDATE_NEWS_CONTAINER_SOURCES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_SOURCES';
export const UPDATE_NEWS_CONTAINER_INDICES = 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER_INDICES';
export const REARRANGE_NEWS_CONTAINER_INDICES = 'NEWSCONTAINER:REARRANGE_NEWS_CONTAINER_INDICES';

export const NEWS_CONTAINER_ACTION_CREATORS = {
  addNewsContainer: (title, url, nextId) => ({
    type: ADD_NEWS_CONTAINER,
    id: nextId,
    title,
    url
  }),
  toggleConfigureMode: (id) => ({
    type: TOGGLE_CONFIGURE_MODE,
		id
  }),
  changeMaxHeadlines: (id, number) => ({
    type: CHANGE_MAX_HEADLINES,
    id,
    number
  }),
  changeTitle: (id, title) => ({
    type: CHANGE_TITLE,
    id,
    title
  }),
  resetContainerState: () => ({
    type: DISABLE_CONFIGURE_MODE
  })
}

export const newsContainer = (state = {}, action, idx = -1) => {
  const { id, url, title, number } = action;
  switch(action.type) {
    case ADD_NEWS_CONTAINER:
      return {
        id,
        url,
        title,
        maxHeadlines: 10,
        timeout: (1000 * 60 * 10),
        items: [],
        allItems: [],
        loading: true,
        configureMode: false
      }
		case TOGGLE_CONFIGURE_MODE:
      if(id === state.id) {
        return Object.assign({}, state, {
          configureMode: !state.configureMode
        });
      } else {
        return state;
      }
		case DISABLE_CONFIGURE_MODE:
      return Object.assign({}, state, {
        configureMode: false
      });
		case CHANGE_MAX_HEADLINES:
      if(id === state.id) {
        return Object.assign({}, state, {
          maxHeadlines: number,
          items: state.allItems.slice(0, number).map((item, idx) => {
            return newsItem(item, action, idx);
          })
        });
      } else {
        return state;
      }
		case CHANGE_TITLE:
      if(id === state.id) {
        return Object.assign({}, state, {
          title
        });
      } else {
        return state;
      }
    case REFRESH_SOURCE:
      if(id == state.id) {
        return {
          ...state,
          loading: true
        }	
      } else {
        return state;
      }	
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if(action.data.id == idx && action.data.feed) {
        let items, allItems;
        if(action.data.err && state.items) {
          items = state.items;
          allItems = state.items
          return {
            ...state,
            loading: false,
            id: idx,
            allItems,
            items
          }
        } else if(!action.data.err) {
          items = action.data.feed.entries.slice(0, state.maxHeadlines);
          allItems = action.data.feed.entries;
          return {
            ...state,
            loading: false,
            id: idx,
            allItems,
            items: items.map((item, idx) => {
              return newsItem(item, action, idx);
            })
          }
        } else {
          return state;
        }
      } else {
        return state; 
      }
    case UPDATE_NEWS_CONTAINER_INDICES:
      return {
        ...state,
        id: idx,
        items: state.items.map((item, itemId) => {
          return newsItem(item, action, itemId, idx);
        })
      }
    case REARRANGE_NEWS_CONTAINER_INDICES:
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
		case REFRESH_SOURCE:
		case TOGGLE_CONFIGURE_MODE:
    case DISABLE_CONFIGURE_MODE:
		case CHANGE_MAX_HEADLINES:
    case CHANGE_TITLE:
			return state.map(n =>
				newsContainer(n, action)
			);
    case ADD_NEWS_CONTAINER:
      return [
        ...state,
        newsContainer(undefined, action)
      ];
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if (action.data.err) {
        console.error(`CONTAINER ERROR: could not get source for url ${action.data.url}`);
      }
      return state.map((n, idx) =>
        newsContainer(n, action, idx) 
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
    case REARRANGE_NEWS_CONTAINER_INDICES:
      const { direction: { left, right }, id: rId } = action.data;
      if(left) {
        if(rId === 0) {
          return state;
        }
        return [
          ...state.slice(0, rId - 1),
          ...state.slice(rId, rId + 1),
          ...state.slice(rId - 1, rId),
          ...state.slice(rId + 1)
        ].map((n, idx) => {
          return newsContainer(n, action, idx);
        });
      } else if(right) {
        if(rId === state.length - 1) {
          return state;
        }
        return [
          ...state.slice(0, rId),
          ...state.slice(rId + 1, rId + 2),
          ...state.slice(rId, rId + 1),
          ...state.slice(rId + 2)
        ].map((n, idx) => {
          return newsContainer(n, action, idx);
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}
