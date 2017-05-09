import Rx from 'rx';
import reader from 'feed-reader';
import { processEntries } from './parser.js';
import NewsStand from './db/schema/NewsStandSchema.js';

//Events
import { 
  UPDATE_NEWS_CONTAINER_SOURCES, 
  UPDATE_NEWS_CONTAINER_INDICES, 
  FETCH_SOURCES } from '../../common/reducers/news_container_reducer.js';

export const refresh$ = new Rx.Subject();
export const fetch$ = new Rx.Subject();
export const persist$ = new Rx.Subject();
export const delete$ = new Rx.Subject();

refresh$.subscribe(handleRefresh);
fetch$.subscribe(handleFetch);
persist$.subscribe(handlePersist);
delete$.subscribe(handleDelete);

function handleRefresh(event) {
  const { action, socket } = event;
  const { id, url } = action.state;
  reader.parse(url).then((feed) => {
    feed.entries = processEntries(feed.entries);
    socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id, url, feed, err: null}});
  }).catch((err) => {
    console.error("ERROR", err)
    socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id, url, feed: null, err}});
  });
}

function handleFetch(event) {
  const { action, socket } = event;
  NewsStand.fetchNewsContainers().then((containers) => {
    socket.emit('action', {type: FETCH_SOURCES, data: {state: containers}})
  }).catch((err) => {
    console.error(`ERROR FETCHING STATE(DEV): ${err}`)
  });
}

function handlePersist(event) {
  const { action, socket } = event;
  NewsStand.persistState(action.state).then().catch((err) => {
    console.error(`ERROR PERSISTING STATE: ${err}`)
  });
}

function handleDelete(event) {
  const { action, socket } = event;
  NewsStand.deleteNewsContainer(action.id).then(() => {
    socket.emit('action', {type: UPDATE_NEWS_CONTAINER_INDICES, data: {id: action.id}});
  }).catch((err) => {
    console.error(`ERROR DELETING ITEM ${action.id}: ${err}`)
  });
}
