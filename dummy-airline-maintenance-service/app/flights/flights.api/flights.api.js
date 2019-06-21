const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
  post: wrapAsync.wrap(async (req, res) => {
    res.send(await flightsService.validate(req.body))
  })
})

module.exports = createController(API)
  .post('/flights', 'post')
  .after([errorMiddleware])
