//Dependencies
import { server } from '../app.js';
import socketIo from 'socket.io';
import reader from 'feed-reader';
import { parseImage } from './parser.js';

//Events
import { REFRESH_SOURCE } from '../../common/reducers/socket_io_reducer.js';
import { UPDATE_NEWS_CONTAINER_SOURCES } from '../../common/reducers/news_container_reducer.js';

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if(action.type == REFRESH_SOURCE) {
      reader.parse(action.url).then((feed) => {
        let processed_entries = feed.entries.map((item) => {
          return {
            ...item,
            img: parseImage(item.content)
          }
        });
        feed.entries = processed_entries;
        socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: feed, err: null}});
      }).catch((err) => {
        console.log("ERROR", err)
        socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: null, err: err}});
      })
    }
  })
});

export default io;
