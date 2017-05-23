//Dependencies
import { server } from '../app.js';
import reader from 'feed-reader';
import { processEntries } from './parser.js';
import socketIo from 'socket.io';
import db from './db/index.js';
import NewsStand from './db/schema/NewsStandSchema.js';

import { REFRESH_SOURCE, FETCH_STATE, DELETE_CONTAINER, PERSIST_STATE, REARRANGE_CONTAINER } from '../../common/reducers/socket_io_reducer.js';

//Events
import { 
  UPDATE_NEWS_CONTAINER_SOURCES, 
  UPDATE_NEWS_CONTAINER_INDICES, 
  REARRANGE_NEWS_CONTAINER_INDICES,
  FETCH_SOURCES } from '../../common/reducers/news_container_reducer.js';

const io = socketIo(server);

io.on('connection', (socket) => {

  if(!db.connection.readyState) {
    db.mongoose.connect('mongodb://localhost/mangrove');
  }

  socket.on('action', (action) => {
    if(action.type) {
      switch(action.type) {
        case REFRESH_SOURCE: 
          const { id, url } = action.state;
          reader.parse(url).then((feed) => {
            feed.entries = processEntries(feed.entries);
            socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id, url, feed, err: null}});
          }).catch((err) => {
            console.error("ERROR REFRESHING SOURCE", err)
            socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id, url, feed: null, err}});
          });
          break;

        case PERSIST_STATE: 
          NewsStand.persistState(action.state).then().catch((err) => {
            console.error(`ERROR PERSISTING STATE: ${err}`)
          });
          break;

        case FETCH_STATE:
          NewsStand.fetchNewsContainers().then((containers) => {
            socket.emit('action', {type: FETCH_SOURCES, data: {state: containers}})
          }).catch((err) => {
            console.error(`ERROR FETCHING STATE(DEV): ${err}`)
          });
          break;

        case DELETE_CONTAINER:
          NewsStand.deleteNewsContainer(action.id).then(() => {
            socket.emit('action', {type: UPDATE_NEWS_CONTAINER_INDICES, data: {id: action.id}});
          }).catch((err) => {
            console.error(`ERROR DELETING ITEM ${action.id}: ${err}`)
          });
          break;

        case REARRANGE_CONTAINER:
          NewsStand.rearrangeContainer(action.id, action.direction).then(() => {
            socket.emit('action', {type: REARRANGE_NEWS_CONTAINER_INDICES, data: { id:action.id, direction: action.direction}});
          }).catch((err) => {
            console.error(`ERROR DELETING ITEM ${action.id}: ${err}`)
          });
          break;
      }
    }
  })
});

export default io;
