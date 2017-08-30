const webpack = require('webpack')
const resolve = require('path').resolve
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const base = require('./base')
const { framework, port } = require('../terra.config')

baseConfig = framework === 'vue' ? merge(base, require('./vue.config')) : merge(base, require('./react.config'))
// register hot
const hotScript =
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
Object.keys(baseConfig.entry).forEach(key => {
  baseConfig.entry[key] = ['./build/dev.client'].concat(baseConfig.entry[key])
})

module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: resolve(__dirname, '../'),
      manifest: require('../manifest.json'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    }),
    new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
    new FriendlyErrorsWebpackPlugin(),
  ],
})
