const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airportsService, wrapAsync }) => ({
  getAirport: wrapAsync.wrap(async (req, res) => {
    res.send(await airportsService.getAirport(req.params.id))
  }),
})

module.exports = createController(API)
  .get('/airports/:id', 'getAirport')
  .after([errorMiddleware])
