const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airportsService, wrapAsync }) => ({
  get: wrapAsync.wrap(async (req, res) => {
    res.send(await airportsService.get(req.params.id))
  }),
})

module.exports = createController(API)
  .get('/airports/:id', 'get')
  .after([errorMiddleware])
