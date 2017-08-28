const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const vendor = require('../terra.config').vendor
module.exports = {
  entry: {
    main: ['./src/main.js'],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js',
  },
}
