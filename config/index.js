const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = {
  vendor: ['lodash'],
  dev: devConfig,
  prod: prodConfig,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      pathRewrite: {
        '^/api/user': '/user',
      },
    },
  },
  port: 8080,
  mock: true,
}
