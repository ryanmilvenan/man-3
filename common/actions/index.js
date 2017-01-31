let nextNewsContainerId = 0;
export const addNewsContainer = (url) => {
  return {
    type: 'ADD_NEWS_CONTAINER',
    id: nextNewsContainerId++,
    url
  }
}
