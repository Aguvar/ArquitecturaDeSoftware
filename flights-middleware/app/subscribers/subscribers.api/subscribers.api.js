const { createController } = require('awilix-express')
const errorMiddleware = require('../../config/middleware/errorMiddleware')
const auth = require('./middleware/auth')

const API = ({ subscribersService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const subscriber = req.body
    res.send(await subscribersService.add(subscriber))
  })
})

module.exports = createController(API)
  .post('/subscribers', 'add', {
    before: [auth]
  })
  .after([errorMiddleware])
