//Dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';

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
    noInfo: false, publicPath: config.output.publicPath
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
      console.log("ACTION RECEIVED");
      socket.emit('action', {type: 'CLIENT:SOURCES', data: {id: action.id, url: action.url}});
    }
  })
});
