const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function getConfig(isProduction) {
  const config = {
    entry: [
      './client/index',
    ],
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, '../client'),
      }],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'client/index.html' },
      ]),
    ],
  };

  if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
    }));
  } else {
    config.entry.unshift('webpack-hot-middleware/client?reload=true');
    config.devtool = 'inline-source-map';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
