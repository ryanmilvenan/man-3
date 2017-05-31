export const newsItem = (state = {}, action, itemId, containerId) => {
  switch (action.type) {
    case UPDATE_NEWS_CONTAINER_SOURCES:
      return {
        ...state,
        itemId,
        containerId: action.id,
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
export const FETCHING_SOURCE = 'NEWSCONTAINER:FETCHING_SOURCE';

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
  }),
  updateNewsContainerSources: (id, url, feed, err) => ({
    type: UPDATE_NEWS_CONTAINER_SOURCES,
    id,
    url,
    feed,
    err
  }),
  fetchSource: (id) => ({
    type: FETCHING_SOURCE,
    id
  }),
  updateNewsContainerIndices: (id) => ({
    type: UPDATE_NEWS_CONTAINER_INDICES,
    id
  }),
  rearrangeNewsContainerIndices: (id, direction) => ({
    type: REARRANGE_NEWS_CONTAINER_INDICES,
    id,
    direction
  })
}

export const newsContainer = (state = {}, action, idx = -1) => {
  const { id, url, title, number } = action;
  switch (action.type) {
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
      if (id === state.id) {
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
      if (id === state.id) {
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
      if (id === state.id) {
        return Object.assign({}, state, {
          title
        });
      } else {
        return state;
      }
    case FETCHING_SOURCE:
      if (id == state.id) {
        return {
          ...state,
          loading: true
        }
      } else {
        return state;
      }
    case UPDATE_NEWS_CONTAINER_SOURCES:
      if (action.id == idx && action.feed) {
        let items, allItems;
        if (action.err && state.items) {
          items = state.items;
          allItems = state.items
          return {
            ...state,
            loading: false,
            id: idx,
            allItems,
            items
          }
        } else if (!action.err) {
          items = action.feed.entries.slice(0, state.maxHeadlines);
          allItems = action.feed.entries;
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
export const NEWS_STAND_ACTION_CREATORS = {
  fetchedSources: (state) => ({
    type: FETCH_SOURCES,
    state
  }),
}
export const newsContainers = (state = [], action) => {
  switch (action.type) {
    case FETCHING_SOURCE:
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
      if (action.err) {
        console.error(`CONTAINER ERROR: could not get source for url ${action.url}`);
      }
      return state.map((n, idx) =>
        newsContainer(n, action, idx)
      );
    case FETCH_SOURCES:
      return [
        ...action.state
      ].map((n, idx) => {
        return newsContainer(n, action, idx);
      });
    case UPDATE_NEWS_CONTAINER_INDICES:
      return state.filter(n =>
        n.id != action.id
      ).map((n, idx) => {
        return newsContainer(n, action, idx);
      });
    case REARRANGE_NEWS_CONTAINER_INDICES:
      const { direction: { left, right }, id: rId } = action;
      if (left) {
        if (rId === 0) {
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
      } else if (right) {
        if (rId === state.length - 1) {
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