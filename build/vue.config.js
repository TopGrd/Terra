const { resolve } = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractStyles = process.env.NODE_ENV === 'development' ? false : true

const cssLoader = [
  { loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
  'resolve-url-loader'
]
const sassLoader = cssLoader.concat([
  { loader: 'sass-loader', options: { sourceMap: true, indentedSyntax: true } }
])
const scssLoader = cssLoader.concat([
  { loader: 'sass-loader', options: { sourceMap: true } }
])

function vueStyleLoader(loader) {
  if (extractStyles) {
    return ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: loader
    })
  }
  return ['vue-style-loader'].concat(loader)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve(__dirname, '../src'),
      resolve(__dirname, '../node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve(__dirname, '../src'),
      'component': resolve(__dirname, '../src/component'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {   
          css: vueStyleLoader(cssLoader),
          scss: vueStyleLoader(scssLoader),
          sass: vueStyleLoader(sassLoader),
          extractCSS: extractStyles
        },
      },
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
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'imgs/[name].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]',          
        }
      }
    ],
  },
}
