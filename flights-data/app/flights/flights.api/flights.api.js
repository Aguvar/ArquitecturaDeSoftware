const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const { quantity, offset, chunkSize } = req.body
    flightsService.publish(quantity, offset, chunkSize)
    res.sendStatus(200)
  })
})

module.exports = createController(API)
  .post('/flights', 'add')
  .after([errorMiddleware])
