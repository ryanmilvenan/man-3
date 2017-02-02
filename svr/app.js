//Dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import reader from 'feed-reader';

//Webpack
import webpack from 'webpack';
import config from '../webpack.config.dev.js'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import handleRender from '../build/server.bundle.js';

//Events
import { REFRESH_SOURCE } from '../common/reducers/socket_io_reducer';
import { UPDATE_NEWS_CONTAINER_SOURCES } from '../common/reducers/news_container_reducer';
const compiler = webpack(config);

const app = express();
const server = http.Server(app);
const io = socketIo(server);

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dev_tools')));
} else {
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.use(handleRender);
}


server.listen(3000, () => {
  console.log("Listening on port 3000");
});

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if(action.type == REFRESH_SOURCE) {
      reader.parse(action.url).then((feed) => {
        socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: feed, err: null}});
      }).catch((err) => {
        socket.emit('action', {type: UPDATE_NEWS_CONTAINER_SOURCES, data: {id: action.id, url: action.url, feed: null, err: err}});
      })
    }
  })
});


