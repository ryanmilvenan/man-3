//Dependencies
import Express from 'express';
import path from 'path';
import { handleRender, renderFullPage } from './entry.js';

//Webpack
import webpack from 'webpack';
import webpackUniversalMiddleware from 'webpack-universal-middleware';
import config from '../webpack.config.js'
const multiCompiler = webpack(config);

const app = Express();

app.use(Express.static(path.resolve(__dirname, '../app')));

app.use(webpackUniversalMiddleware(multiCompiler));

app.use(handleRender);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

