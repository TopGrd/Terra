const { resolve } = require('path')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DllReferencePlugin } = webpack

const cleanOptions = {
  exclude: ['static'],
  verbose: true,
  dry: false,
}

module.exports = {
  entry: {
    client: ['./src/index.js'],
    vendor: ['./static/js/vendor.dll.js']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.html$/,
        loader: 'ejs-loader',
      },
    ],
  },
  devtool: 'cheap-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new DllReferencePlugin({
      context: resolve(__dirname, 'src'),
      manifest: require('../vendor-manifest.json'),
    }),
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
    new CleanWebpackPlugin(['dist'], cleanOptions),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../static'),
        to: resolve(__dirname, '../dist/static'),
      },
    ]),
  ],
}
