const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airlinesService, wrapAsync }) => ({
  get: wrapAsync.wrap(async (req, res) => {
    res.send(await airlinesService.get(req.params.id))
  }),
})

module.exports = createController(API)
  .get('/airlines/:id', 'get')
  .after([errorMiddleware])
