const path = require('path');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  client: path.resolve(__dirname, 'client'),
  server: path.resolve(__dirname, 'svr'),
  out: path.resolve(__dirname, 'build')
};

const extractCSS = new ExtractTextPlugin('stylesheets/css-bundle.css');
const extractSASS = new ExtractTextPlugin('stylesheets/sass-bundle.css');
module.exports = [{
    name: 'client',
    context: PATHS.client,
    entry: {
      client: './index.js',
      vendor: Object.keys(pkg.dependencies),
    },
    output: {
      path: PATHS.out,
      filename: '[name].bundle.js',
      sourceMapFilename: "[name].bundle.js.map",
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
          loader: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true' })
        },
        {
          test: /\.scss$/,
          loader: extractSASS.extract({
            fallback: 'style-loader',
            use: "css-loader?minimize=true!sass-loader"
          })
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
      extractCSS,
      extractSASS,
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'AUTH0_DOMAIN': JSON.stringify('carnivalinparadise.auth0.com'),
        'AUTH0_CLIENT_ID': JSON.stringify('vtMxr0t5RYIhNY8ZqEyRQbuTHiPqeShn'),
        'API': JSON.stringify('https://www.carnivalinparadise.com'),
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new CopyWebpackPlugin([
        { from: './sw.js' },
        { from: './manifest.json' }
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
  },
  {
    name: 'server',
    context: PATHS.server,
    target: 'node',
    externals: [nodeExternals()],
    entry: './entry.js',
    output: {
      path: PATHS.out,
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.css$/,
          loader: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true' })
        },
        {
          test: /\.scss$/,
          loader: extractSASS.extract({
            fallback: 'style-loader',
            use: "css-loader?minimize=true!sass-loader"
          })
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
      extractCSS,
      extractSASS,
      new CopyWebpackPlugin([
        { from: 'carnival.png' }
      ]),
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
]
