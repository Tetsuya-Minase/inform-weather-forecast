// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: ['node_modules']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  externals: [nodeExternals()]
};
