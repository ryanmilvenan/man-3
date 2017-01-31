let nextNewsContainerId = 0;
export const addNewsContainer = (url) => {
  return {
    type: 'ADD_NEWS_CONTAINER',
    id: nextNewsContainerId++,
    url
  }
}

export const sendSocketMessage = (data) => {
  return {
    type: 'server:hello',
    data
  }
}
