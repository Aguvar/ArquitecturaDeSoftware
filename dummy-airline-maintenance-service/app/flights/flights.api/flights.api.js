const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    res.send(await flightsService.add(req.body))
  })
})

module.exports = createController(API)
  .post('/*', 'add')
  .after([errorMiddleware])
