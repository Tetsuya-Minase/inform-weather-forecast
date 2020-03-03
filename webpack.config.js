const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/app.ts'),
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: 'ts-loader'},
          {loader: 'eslint-loader'}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  output: {
    libraryTarget: 'this',
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  externals: [nodeExternals()]
};
