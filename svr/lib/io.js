//Dependencies
import { server } from '../app.js';
import socketIo from 'socket.io';
import reader from 'feed-reader';
import { checkHtml, processEntries } from './parser.js';
import db from './db/index.js';
import NewsStand from './db/schema/NewsStandSchema.js';

//Events
import { REFRESH_SOURCE, FETCH_STATE, DELETE_CONTAINER } from '../../common/reducers/socket_io_reducer.js';
import { 
  UPDATE_NEWS_CONTAINER_SOURCES, 
  UPDATE_NEWS_CONTAINER_INDICES, 
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
          reader.parse(action.url).then((feed) => {

            NewsStand.refreshSources(action.state).then(() => {
              feed.entries = processEntries(feed.entries);
              NewsStand.saveProcessedEntries(feed.entries, action.id).then(() => {
                socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: feed, err: null}});
              })
            });

          }).catch((err) => {
            console.error("ERROR", err)
            socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: null, err: err}});
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

      }
    }
  })
});

export default io;
