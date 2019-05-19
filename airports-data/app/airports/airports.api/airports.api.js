const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airportsService, wrapAsync }) => ({
  getAirport: wrapAsync.wrap(async (req, res) => {
    res.send(await airportsService.getAirport(req.params.id))
  }),
  getAirports: wrapAsync.wrap(async (req, res) => {
    res.send(await airportsService.getAirports())
  })
})

module.exports = createController(API)
  .get('/airports', 'getAirports')
  .get('/airports/:id', 'getAirport')
  .after([errorMiddleware])
