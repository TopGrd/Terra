const path = require('path')
const webpack = require('webpack')
const vendor = require('../terra.config').vendor
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const { DllPlugin, UglifyJsPlugin } = webpack
const { resolve } = path

module.exports = {
  entry: {
    vendor,
  },
  output: {
    path: resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]',
  },
  plugins: [
    new DllPlugin({
      context: resolve(__dirname, '../'),
      path: resolve(__dirname, '..', 'manifest.json'),
      name: '[name]',
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
