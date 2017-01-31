//Dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';

//Webpack
import webpack from 'webpack';
import webpackUniversalMiddleware from 'webpack-universal-middleware';
import config from '../webpack.config.dev.js'
import handleRender from '../build/server.bundle.js';
const multiCompiler = webpack(config);

const app = express();
const server = http.Server(app);
const io = socketIo(server);

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackUniversalMiddleware(multiCompiler));
} else {
  app.use(express.static(path.resolve(__dirname, '../build')));
}

app.use(handleRender);

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

io.on('connection', (socket) => {
  console.log("CONNECTION RECEIVED");
  socket.emit('server:connected', {hello: 'world'});
});
