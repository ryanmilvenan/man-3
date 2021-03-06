//Dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './lib/routes';

//Webpack
import webpack from 'webpack';
import config from '../webpack.config.dev.js'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import handleRender from '../build/server.bundle.js';

const compiler = webpack(config);

export const app = express();
export const server = http.Server(app);

const gzip = (req, res, next) => {
  if (req.baseUrl === '/sw.js') {
    next();
  } else {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  }
};

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(bodyParser.json());
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dev_tools')));
  app.use(routes);
} else {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('*.js', gzip);
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.use(routes);
  app.use(handleRender);
}

server.listen(3000, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("Dev Server listening on port 3000");
  } else {
    console.log("Production bundle available on port 3000");
  }
});