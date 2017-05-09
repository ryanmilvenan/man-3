//Dependencies
import { server } from '../app.js';
import { refresh$, fetch$, delete$, persist$ } from './reactive.js';
import socketIo from 'socket.io';
import db from './db/index.js';

import { REFRESH_SOURCE, FETCH_STATE, DELETE_CONTAINER, PERSIST_STATE } from '../../common/reducers/socket_io_reducer.js';

const io = socketIo(server);

io.on('connection', (socket) => {

  if(!db.connection.readyState) {
    db.mongoose.connect('mongodb://localhost/mangrove');
  }

  socket.on('action', (action) => {
    if(action.type) {
      switch(action.type) {
      case REFRESH_SOURCE: 
        refresh$.onNext({action, socket});
        break;

      case PERSIST_STATE: 
        persist$.onNext({action, socket});
        break;

      case FETCH_STATE:
        fetch$.onNext({action, socket});
        break;

      case DELETE_CONTAINER:
        delete$.onNext({action, socket});
        break;

      }
    }
  })
});

export default io;
