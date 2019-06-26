const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ subscribersService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const subscriber = req.body
    await subscribersService.add(subscriber)
    res.sendStatus(200)
  }),
  getAll: wrapAsync.wrap(async (req, res) => {
    res.send(await subscribersService.getAll())
  })
})

module.exports = createController(API)
  .post('/subscribers', 'add')
  .get('/subscribers', 'getAll')
  .after([errorMiddleware])
