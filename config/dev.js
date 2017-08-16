const webpack = require('webpack')
const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    client: ['./src/index.js'],
    vendor: ['./static/js/vendor.dll.js']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
  ],
}
