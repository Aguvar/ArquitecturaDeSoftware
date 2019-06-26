const { createController } = require('awilix-express')
const errorMiddleware = require('../../config/middleware/errorMiddleware')

const API = ({ subscribersService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const subscriber = req.body
    res.send(await subscribersService.add(subscriber))
  }),
  getAll: wrapAsync.wrap(async (req, res) => {
    res.send(await subscribersService.getAll())
  })
})

module.exports = createController(API)
  .post('/subscribers', 'add')
  .get('/subscribers', 'getAll')
  .after([errorMiddleware])
