//Dependencies
import express from 'express';
import http from 'http';
import path from 'path';

//Webpack
import webpack from 'webpack';
import config from '../webpack.config.dev.js'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import handleRender from '../build/server.bundle.js';

const compiler = webpack(config);

export const app = express();
export const server = http.Server(app);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dev_tools')));
} else {
  app.use('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.use(handleRender);
}

server.listen(3000, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("Dev Server listening on port 3000");
  } else {
    console.log("Production bundle available on port 3000");
  }
});

const io = require('./lib/io.js').default;