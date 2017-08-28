const { resolve } = require('path')
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const base = require('./base')
const { DllReferencePlugin } = webpack

const { framework } = require('../terra.config')

baseConfig = framework === 'vue' ? merge(base, require('./vue.config')) : merge(base, require('./react.config'))
const cleanOptions = {
  root: path.resolve(__dirname, '../'),
  exclude: ['static'],
  verbose: true,
  dry: false,
}
console.log(__dirname)

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CleanWebpackPlugin(['dist'], cleanOptions),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new DllReferencePlugin({
      context: resolve(__dirname, '../'),
      manifest: require('../manifest.json'),
    }),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      name: 'Test',
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../static'),
        to: resolve(__dirname, '../dist/static'),
      },
    ]),
    new FriendlyErrorsWebpackPlugin(),
  ],
})
