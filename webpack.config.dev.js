require('react-hot-loader/patch')

const path = require('path');
const webpack = require('webpack');

const PATHS = {
  dev: path.resolve(__dirname, 'dev_tools')
};

module.exports = {
  name: 'client',
  context: PATHS.dev,
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    './index.dev.js',
  ],
  output: {
    path: PATHS.dev,
    filename: 'client.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader:'babel-loader'
          }
        ]
      }	
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules') 
    ] 
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'common')
    ] 
  }
} 

