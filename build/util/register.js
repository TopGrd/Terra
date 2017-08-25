const fs = require('fs')
const chalk = require('chalk')
const { trim, isEmpty } = require('./util')

const mapMockRouter = (router, mockMap) => {
  const routes = Object.entries(mockMap).map(item => {
    const [method, route] = item[0].split(' ')
    return {
      func: item[1],
      method,
      route,
    }
  })

  registerRoute(router, routes)
}

const registerRoute = (router, routes) => {
  routes.forEach(item => {
    const uri = trim(item.route)
    const { method, func } = item
    const restMap = {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'del',
    }

    if (!Object.keys(restMap).includes(item.method)) {
      console.log(`[ERROR] ${method} is not a restful method`)
      return
    }
    console.log(chalk.blue('register a mock route: ', chalk.bgYellow(`${method} ==> ${uri}`)))
    router[restMap[method]].call(router, uri, func)
  })
}

const mockServer = mockMap => {
  if (isEmpty(mockMap)) {
    console.log(chalk.red('No route config in mock dir!'))
  }

  const router = require('express').Router()
  mapMockRouter(router, mockMap)
  return router
}

module.exports = mockServer
