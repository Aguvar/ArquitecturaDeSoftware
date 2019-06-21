const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  broadcast: wrapAsync.wrap(async (req, res) => {
    res.send(await flightsService.broadcast())
  }),
})

module.exports = createController(API)
  .get('/flights', 'broadcast')
  .after([errorMiddleware])
