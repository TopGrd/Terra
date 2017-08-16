const path = require('path')
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev.config')
const mockRoutes = require('./util/register')
const mockMap = require('./util/assign')

const { port, proxy, mock } = require('./config')

console.log('Starting develop server...')
console.log('compiling')
const app = express()
app.use(express.static('./dist/static'))
const compiler = webpack(config)

const devMiddleWare = WebpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
})

app.use(devMiddleWare)

app.use(
  WebpackHotMiddleware(compiler, {
    log: null,
    path: '/__webpack_hmr',
  }),
)

const fileSys = devMiddleWare.fileSystem
const file = path.join(compiler.options.output.path, 'index.html')
app.get('/', function(req, res, next) {
  devMiddleWare.waitUntilValid(() => {
    compiler.outputFileSystem.readFile(file, (err, body) => {
      if (err) {
        console.log(err)
      }

      res.set('content-type', 'text/html')
      res.send(body)
      res.end()
    })
  })
})

// router proxy
Object.keys(proxy).forEach(route => {
  app.use(route, proxyMiddleware(proxy[route]))
})

if (mock) {
  app.use(mockRoutes(mockMap))
}

const server = app.listen(port, () => {
  // resolve net::ERR_INCOMPLETE_CHUNKED_ENCODING in node v8.0
  server.keepAliveTimeout = 0

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  const host = process.env.HOST || 'localhost'
  console.log('Your application is running at:')
  console.log()
  const appUrl = `${chalk.cyan(`${protocol}://${host}:${port}/`)}`
  console.log(appUrl)
})
