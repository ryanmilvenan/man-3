const newsContainer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_NEWS_CONTAINER':
      return {
        id: action.id,
        url: action.url,
        timeout: (1000 * 60 * 10)
      }
    default:
      return state;
  }
}

const newsContainers = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEWS_CONTAINER':
      return [
        ...state,
        newsContainer(undefined, action)
      ];
    default:
      return state;
  }
}

export default newsContainers;
