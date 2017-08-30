const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const lib = require('../terra.config').lib

module.exports = {
  entry: {
    main: ['./src/main.js'],
    lib,
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js',
  },
}
