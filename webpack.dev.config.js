// TODO: use hot loader to replace hmr
// doc: https://github.com/gaearon/react-hot-loader/tree/master/docs
const devConfig = require('./config').dev
const prodConfig = require('./webpack.prod.config')
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

Object.keys(devConfig.entry).forEach(key => {
  devConfig.entry[key] = devConfig.entry[key].concat(hotScript)
})

module.exports = Object.assign({}, prodConfig, devConfig)
