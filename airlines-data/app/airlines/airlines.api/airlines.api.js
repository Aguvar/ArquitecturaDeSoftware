const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airlinesService, wrapAsync }) => ({
  getAirline: wrapAsync.wrap(async (req, res) => {
    res.send(await airlinesService.getAirline(req.params.id))
  }),
})

module.exports = createController(API)
  .get('/airlines/:id', 'getAirline')
  .after([errorMiddleware])
