const path = require('path');
const nodeExternals = require('webpack-node-externals');
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
