const fs = require('fs')
const path = require('path')
const mock = {}
fs.readdirSync('./mock').forEach(function(file) {
  const realPath = path.resolve('./mock', file)
  Object.assign(mock, require(realPath))
})

module.exports = mock
