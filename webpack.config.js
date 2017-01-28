const path = require('path');

const PATHS = {
  client: path.resolve(__dirname, 'client'),
  server: path.resolve(__dirname, 'svr'),
  build: path.resolve(__dirname, 'build')
};

module.exports = {
  entry: {
    client: PATHS.client
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

};

module.exports = [
  {
    name: 'client',
    context: PATHS.client,
    entry: './index.js',
    output: {
      path: PATHS.out,
      filename: 'client.bundle.js',
      publicPath: '/'
    }
  }, 
  {
    name: 'server',
    context: PATHS.server,
    target: 'node',
    entry: './entry.js',
    output: {
      path: PATHS.out,
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2'
    }
  }
]
