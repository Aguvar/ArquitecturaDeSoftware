const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airlinesService, wrapAsync }) => ({
  getAll: wrapAsync.wrap(async (req, res) => {
    res.send(await airlinesService.getAll())
  })
})

module.exports = createController(API)
  .get('/airlines', 'getAll')
  .after([errorMiddleware])
