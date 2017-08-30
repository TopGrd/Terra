module.exports = {
  vendor: ['vue/dist/vue.esm.js', 'vue-router'],
  lib: ['lodash'],
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
  framework: 'vue',
}
