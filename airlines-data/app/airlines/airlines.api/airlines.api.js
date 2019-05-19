const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airlinesService, wrapAsync }) => ({
  getAirline: wrapAsync.wrap(async (req, res) => {
    res.send(await airlinesService.getAirline(req.params.id))
  }),
  getAirlines: wrapAsync.wrap(async (req, res) => {
    res.send(await airlinesService.getAirlines())
  })
})

module.exports = createController(API)
  .get('/airlines', 'getAirlines')
  .get('/airlines/:id', 'getAirline')
  .after([errorMiddleware])
