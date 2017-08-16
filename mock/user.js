const Mock = require('mockjs')
const userData = Mock.mock({
  'data|12': [
    {
      name: '@name',
    },
  ]
})
module.exports = {
  ['POST /user'](req, res) {
    res.json({
      msg: 'add user success!',
      code: 0,
      data: {}
    })
  },

  ['GET /user'](req, res) {
    res.status(201).json({
      data: userData,
      code: 0,
      msg: 'query success'
    })
  },
}
