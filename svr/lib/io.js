//Dependencies
import { server } from '../app.js';
import socketIo from 'socket.io';
import reader from 'feed-reader';
import { checkHtml, parseImage, encodeHtml } from './parser.js';
import db from './db.js'

//Events
import { REFRESH_SOURCE, FETCH_STATE } from '../../common/reducers/socket_io_reducer.js';
import { UPDATE_NEWS_CONTAINER_SOURCES, FETCH_SAVED_SOURCES } from '../../common/reducers/news_container_reducer.js';

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if(action.type) {
      switch(action.type) {
        case REFRESH_SOURCE: 
          reader.parse(action.url).then((feed) => {

            if(!db.connection.readyState) {
              db.mongoose.connect('mongodb://localhost/mangrove');
            }

            //Persist the current state
            let findCurrentState = db.NewsStand.find({}).exec();
            findCurrentState.then((docs) => {

              let newsStand;
              if(!docs.length) {
                newsStand = new db.NewsStand(action.state);
              } else {
                let currentState = docs[0];
                currentState.newsContainers = action.state.newsContainers;
                newsStand = currentState;
              }

              let saveState = newsStand.save();
              saveState.then(() => {

                let processed_entries = feed.entries.map((item) => {
                  if(checkHtml(item.content)) {
                    return {
                      ...item,
                      img: parseImage(item.content),
                      raw_html: {__html: item.content}
                    }
                  } else {
                    return item; 
                  }
                })
                feed.entries = processed_entries;
                socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: feed, err: null}});

              }).catch((err) => {
                console.error(`ERROR SAVING STATE: ${error}`);
              })
            }).catch((err) => {
              console.error(`ERROR FETCHING STATE: ${error}`);
            });
          }).catch((err) => {
            console.error("ERROR", err)
            socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: null, err: err}});
          });
        break;

      case FETCH_STATE:
        if(!db.connection.readyState) {
          db.mongoose.connect('mongodb://localhost/mangrove');
        }

        let fetchState = db.NewsStand.find({}).exec();
        fetchState.then((docs) => {

          let newsStand;
          if(docs.length) {
            let currentState = docs[0];
            newsStand = currentState.newsContainers;
          } else {
            newsStand = [] 
          }
          socket.emit('action', {type: FETCH_SAVED_SOURCES, data: {state: newsStand}})

        }).catch((err) => {
          console.error(`ERROR FETCHING STATE(DEV): ${err}`)
        });
        break;
      }
    }
  })
});

export default io;
