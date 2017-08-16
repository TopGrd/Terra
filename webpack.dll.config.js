const path = require('path')
const webpack = require('webpack')
const vendor = require('./config').vendor
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const { DllPlugin, UglifyJsPlugin } = webpack
const { resolve } = path

module.exports = {
  entry: {
    vendor,
  },
  output: {
    path: resolve(__dirname, './static/js'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new DllPlugin({
      path: resolve(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: resolve(__dirname, 'src'),
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
