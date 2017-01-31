const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const PATHS = {
  dev: path.resolve(__dirname, 'dev_tools'),
  out: path.resolve(__dirname, 'build')
};

module.exports = [
  {
    name: 'client',
    context: PATHS.dev,
    entry: [
      'webpack-hot-middleware/client?name=client',
      'react-hot-loader/patch',
      './index.dev.js',
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  }, 
  {
    name: 'server',
    context: PATHS.dev,
    target: 'node',
    externals: [nodeExternals()],
    entry: './server-entry.dev.js',
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
		}
  }
]
