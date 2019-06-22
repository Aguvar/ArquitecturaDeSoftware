const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  send: wrapAsync.wrap(async (req, res) => {
    const { quantity, offset } = req.body
    res.send(await flightsService.publish(quantity, offset))
  })
})

module.exports = createController(API)
  .post('/flights', 'send')
  .after([errorMiddleware])
