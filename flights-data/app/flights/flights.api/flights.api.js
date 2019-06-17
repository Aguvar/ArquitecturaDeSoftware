const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  send: wrapAsync.wrap(async (req, res) => {
    res.send(await flightsService.broadcast(10, 2))
  }),
})

module.exports = createController(API)
  .get('/flights', 'send')
  .after([errorMiddleware])
