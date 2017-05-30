require('react-hot-loader/patch')

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  dev: path.resolve(__dirname, 'dev_tools')
};

module.exports = {
  name: 'client',
  context: PATHS.dev,
  devtool: 'cheap-source-map',
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
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.scss$/,
        loaders: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loaders: [{
          loader: 'url-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'API': JSON.stringify('http://localhost:3000')
    }),
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin([
      { from: './sw.dev.js' }
    ])
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