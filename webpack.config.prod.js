const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  client: path.resolve(__dirname, 'client'),
  server: path.resolve(__dirname, 'svr'),
  out: path.resolve(__dirname, 'build')
};

module.exports = [
  {
    name: 'client',
    context: PATHS.client,
    entry: [
      './index.js',
    ],
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
					loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader:'css-loader' })
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
      new ExtractTextPlugin('bundle.css')
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
					loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader:'css-loader' })
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
