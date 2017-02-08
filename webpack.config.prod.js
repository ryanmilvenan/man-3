const path = require('path');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  client: path.resolve(__dirname, 'client'),
  server: path.resolve(__dirname, 'svr'),
  out: path.resolve(__dirname, 'build')
};

const extractCSS = new ExtractTextPlugin('stylesheets/css-bundle.css');
const extractSASS = new ExtractTextPlugin('stylesheets/sass-bundle.css');
module.exports = [
  {
    name: 'client',
    context: PATHS.client,
    entry: {
      main:'./index.js',
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.out,
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
				},	
				{
					test: /\.css$/,
					loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader:'css-loader?minimize=true' })
				},	
        {
          test: /\.scss$/,
          loader: extractSASS.extract({
            fallbackLoader: 'style-loader',
            loader: "css-loader?minimize=true!sass-loader"
          })
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
          loaders: [
            {
              loader:'url-loader'
            }
          ]
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
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"})
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
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: [
            {
						  loader:'babel-loader'
            }
					]
				},	
				{
					test: /\.css$/,
					loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader:'css-loader?minimize=true' })
				},	
        {
          test: /\.scss$/,
          loader: extractSASS.extract({
            fallbackLoader: 'style-loader',
            loader: "css-loader?minimize=true!sass-loader"
          })
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
          loaders: [
            {
              loader:'url-loader'
            }
          ]
        }	
			]
    },
    plugins: [
      extractCSS,
      extractSASS
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
