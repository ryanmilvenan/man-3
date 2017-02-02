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
const compiler = webpack(config);

const app = express();
const server = http.Server(app);
const io = socketIo(server);

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dev_build')));
} else {
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.use(handleRender);
}


server.listen(3000, () => {
  console.log("Listening on port 3000");
});

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if(action.type == 'SERVER:REFRESH_SOURCE') {
      reader.parse(action.url).then((feed) => {
        socket.emit('action', {type: 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER', data: {id: action.id, feed: feed, err: null}});
      }).catch((err) => {
        socket.emit('action', {type: 'NEWSCONTAINER:UPDATE_NEWS_CONTAINER', data: {id: action.id, feed: null, err: err}});
      })
    }
  })
});


